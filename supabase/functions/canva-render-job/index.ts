import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing configuration environment variables");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const { post_id } = await req.json();

    if (!post_id) {
        throw new Error("Missing post_id in payload");
    }

    // 1. Fetch the Social Post and Canva Token
    const { data: post, error: postError } = await supabase
        .from("social_posts" as any)
        .select("*, content_items(*)")
        .eq("id", post_id)
        .single();

    if (postError || !post) throw new Error("Could not find social post record");

    const { data: canvaInt, error: canvaError } = await supabase
        .from("integrations" as any)
        .select("*")
        .eq("platform", "canva")
        .single();

    if (canvaError || !canvaInt?.access_token) {
        throw new Error("Canva integration not connected or token missing");
    }

    // 2. Prepare Canva Autofill Payload
    // This is a template-specific mapping. 
    // Usually you define which fields in Canva match which slide body.
    const slides = post.carousel_copy || [];
    const dataset = {
        // Example mapping: Slide1_Title, Slide1_Body, etc.
        ...slides.reduce((acc: any, slide: any, idx: number) => {
            acc[`Slide${idx+1}_Headline`] = { text: slide.headline };
            acc[`Slide${idx+1}_Body`] = { text: slide.body };
            return acc;
        }, {})
    };

    // 3. Call Canva Autofill API
    // Note: This requires a valid Brand Template ID
    const brandTemplateId = canvaInt.settings?.template_id || "BRAND_TEMPLATE_ID";

    const canvaResponse = await fetch("https://api.canva.com/v1/autofills", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${canvaInt.access_token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            brand_template_id: brandTemplateId,
            data: dataset,
            title: `SpatialMetric Carousel: ${post.content_items?.title}`
        }),
    });

    if (!canvaResponse.ok) {
        const errText = await canvaResponse.text();
        throw new Error(`Canva API Error: ${canvaResponse.status} ${errText}`);
    }

    const { job } = await canvaResponse.json();

    // 4. Update status to 'rendering'
    await supabase
        .from("social_posts" as any)
        .update({ status: 'rendering', canva_job_id: job.id })
        .eq("id", post_id);

    return new Response(JSON.stringify({ success: true, job_id: job.id }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (error) {
    console.error("Error in canva-render-job:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
