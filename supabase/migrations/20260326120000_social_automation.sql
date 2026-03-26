
-- Social Media Integrations Table
CREATE TABLE IF NOT EXISTS public.integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform TEXT NOT NULL UNIQUE, -- 'canva', 'linkedin', 'meta'
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMPTZ,
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on integrations
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;

-- Only permit admins or edge functions to read/write tokens
-- Assuming 'service_role' or specific admin roles have access
CREATE POLICY "Admins can manage integrations" 
ON public.integrations 
FOR ALL 
USING (auth.jwt() ->> 'role' = 'service_role');

-- Social Posts Tracking Table
CREATE TABLE IF NOT EXISTS public.social_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_item_id UUID REFERENCES public.content_items(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'rendering', 'rendered', 'publishing', 'published', 'failed'
    carousel_copy JSONB DEFAULT '[]'::jsonb,
    canva_job_id TEXT,
    asset_urls TEXT[] DEFAULT '{}',
    live_urls JSONB DEFAULT '{}'::jsonb,
    error_log TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on social_posts
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for social_posts" 
ON public.social_posts FOR SELECT USING (true);

-- Functions to update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_integrations_updated_at
    BEFORE UPDATE ON public.integrations
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_social_posts_updated_at
    BEFORE UPDATE ON public.social_posts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Webhook to trigger generate-carousel-copy when a new article is inserted
-- Note: This requires the function to be deployed and the name to match.
-- We use a generic trigger that calls a supabase edge function via http request.

CREATE OR REPLACE FUNCTION public.trigger_social_copy_generation()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.type = 'article' THEN
        PERFORM
            net.http_post(
                url := 'https://' || (SELECT value FROM secrets WHERE name = 'SUPABASE_PROJECT_REF') || '.supabase.co/functions/v1/generate-carousel-copy',
                headers := jsonb_build_object(
                    'Content-Type', 'application/json',
                    'Authorization', 'Bearer ' || (SELECT value FROM secrets WHERE name = 'SUPABASE_SERVICE_ROLE_KEY')
                ),
                body := jsonb_build_object('record', row_to_json(NEW))
            );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: The above net.http_post requires the pg_net extension which is standard in Supabase.
-- It also assumes a 'secrets' table or access to env vars which is usually handled via 
-- standard Supabase webhook UI, but we can define it here for completeness if pg_net is enabled.

/* 
-- If applying via SQL Editor, ensure pg_net is enabled:
CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE TRIGGER on_article_created
    AFTER INSERT ON public.content_items
    FOR EACH ROW EXECUTE FUNCTION public.trigger_social_copy_generation();
*/
