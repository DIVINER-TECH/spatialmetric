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
    const payload = await req.json(); // Canva webhook payload

    // 1. Identify the Job and Post
    const jobId = payload.job_id;
    const status = payload.status; // 'success' or 'failure'

    if (!jobId) throw new Error("Missing job_id in webhook");

    const { data: post, error: postError } = await supabase
        .from("social_posts" as any)
        .select("*")
        .eq("canva_job_id", jobId)
        .single();

    if (postError || !post) throw new Error(`Could not find post for Canva Job ${jobId}`);

    if (status === 'failure') {
        await supabase.from("social_posts" as any).update({ status: 'failed', error_log: 'Canva rendering failed' }).eq("id", post.id);
        return new Response(JSON.stringify({ success: false }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // 2. Fetch Exported Assets
    // In a real scenario, you'd call Canva GET /v1/autofills/{id} to get the design URLs
    // Then call GET /v1/exports to get the images.
    // For this stub, we assume success and move to 'rendered'
    
    await supabase.from("social_posts" as any).update({ 
        status: 'rendered',
        // In reality, asset_urls would be populated by downloading the exports
        asset_urls: ['https://placeholder.com/slide1.jpg'] 
    }).eq("id", post.id);

    // 3. Trigger the Publisher
    await fetch(`${supabaseUrl}/functions/v1/social-publisher`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${serviceRoleKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_id: post.id })
    });

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (error) {
    console.error("Error in canva-webhook-handler:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
