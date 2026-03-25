# End-to-End Social Media Automation Pipeline

This document outlines the architecture for a fully automated, zero-touch system that transforms AI-generated SpatialMetric articles into highly engaging Canva carousel posts and natively publishes them to LinkedIn and Meta (Instagram/Facebook).

## Prerequisites

**This is a highly complex integration requiring four distinct external platforms. The following must be prepared before development begins:**
1.  **Canva Enterprise**: The Autofill API is strictly limited to enterprise/teams accounts. You *must* have this tier to create templates programmatically.
2.  **Meta Developer App**: You will need to create a Meta Developer App, get it approved for `instagram_content_publish` and `pages_manage_posts`, and complete Business Verification.
3.  **LinkedIn Developer App**: You will need a LinkedIn Developer App approved for the "Share on LinkedIn" and "Sign In with LinkedIn" products.
4.  **OAuth Management**: These platforms require token refreshes. The system will handle this, but the initial connection must be done manually by an admin via the dashboard.

## System Architecture

The pipeline consists of a continuous chain of Supabase Edge Functions, triggered chronologically.

### 1. Content Generation (`auto-content`) [Already Exists]
*   **Action**: Scrapes news, uses Groq to write articles (`market-intelligence`, `tech-explain`, etc.).
*   **Trigger**: Daily cron job.
*   **Next Step**: Inserts into `content_items` table.

### 2. Context-to-Carousel AI (`generate-carousel-copy`) [NEW]
*   **Trigger**: Database Webhook trigger on `INSERT` into `content_items`.
*   **Action**: 
    - Detects the article category.
    - Sends the 600-word article to Groq with a strict prompt: "Extract the core value into 5 punchy slides for an Instagram carousel. Return exactly 5 objects with `Headline`, `Subtext`, and `Data_Point`."
    - Saves the resulting JSON "Slide Copy" to a new `social_posts` table with status `draft`.

### 3. Canva Autofill Engine (`canva-render-job`) [NEW]
*   **Trigger**: Initiated immediately after step 2.
*   **Action**:
    - Reads the OAuth token from the `integrations` table.
    - Selects the correct Canva Brand Template ID based on the category (e.g., Template A for Tech Explain, Template B for Market Intel).
    - Calls `POST /v1/autofills` to map the Groq "Slide Copy" into the Canva template fields.
    - **Wait State**: Canva rendering is asynchronous.

### 4. Asset Export & Webhook Listener (`canva-webhook-handler`) [NEW]
*   **Trigger**: External webhook from Canva indicating the Autofill Job is "Success".
*   **Action**:
    - Calls `POST /v1/exports` to generate JPGs for each slide.
    - Downloads the images to Supabase Storage (`social_assets` bucket).
    - Updates `social_posts` table status to `rendered`.

### 5. Multi-Platform Publisher (`social-publisher`) [NEW]
*   **Trigger**: Database Webhook trigger when `social_posts` status changes to `rendered`.
*   **Action**:
    - Reads the generated images from Supabase Storage.
    - Uses Groq one final time to generate the post caption and hashtags based on the original article.
    - **LinkedIn Protocol**: Uses the LinkedIn UGC (User Generated Content) Post API to upload images and create a carousel post.
    - **Meta Protocol (Instagram)**: Uses the Instagram Graph API. *Note: Instagram API requires images to be uploaded to public URLs first, which Supabase Storage handles perfectly.* Creates a carousel container and publishes.
    - Updates `social_posts` table status to `published` and stores the live URLs.

---

## Required Database Schema Changes

### `integrations` Table
A secure vault to hold OAuth tokens. Row Level Security must restrict access strictly to Edge Functions and Admins.
*   `platform` (canva, linkedin, meta)
*   `access_token` (encrypted)
*   `refresh_token` (encrypted)
*   `expires_at`

### `social_posts` Table
Tracks the lifecycle of a single post to prevent duplicates and handle retries.
*   `content_item_id` (foreign key to the source article)
*   `status` (draft, rendering, rendered, publishing, published, failed)
*   `carousel_copy` (JSON from Groq)
*   `canva_job_id`
*   `asset_urls` (array of Supabase Storage URLs)
*   `live_urls` (links to the actual posts on LinkedIn/IG)

---

## Frontend Integration (Admin Dashboard)

While the system is fully automated, the admin needs visibility. We will add a **"Social Media Control Room"** to the `MarketIntelligence.tsx` or a new settings page.

1.  **OAuth Connection Center**: Buttons to "Connect Canva", "Connect LinkedIn", "Connect Meta". This handles the OAuth redirects.
2.  **Pipeline Monitor**: A table showing recent `social_posts` so you can visually track if an article is currently rendering in Canva or successfully posted.
3.  **Template Mapper UI**: A simple config file/UI to link "Market Intelligence" articles to Canva Template ID `xyz-123`.

## Verification & Phased Rollout Plan

Because building all 4 integrations at once is highly risky, we must build in phases:

*   **Phase 1**: Database schema & OAuth UI. (Get the connections working).
*   **Phase 2**: `generate-carousel-copy`. (Verify Groq can reliably output exactly 5 slides of copy).
*   **Phase 3**: Canva Integration. (Just render the images and save to Supabase Storage. Stop there and verify visually).
*   **Phase 4**: Delivery API. (Connect LinkedIn and Meta to publish the saved images).
