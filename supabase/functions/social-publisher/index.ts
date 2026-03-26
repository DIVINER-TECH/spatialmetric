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
    const groqKey = Deno.env.get("GROQ_API_KEY") ?? "";
    
    if (!supabaseUrl || !serviceRoleKey || !groqKey) {
      throw new Error("Missing configuration environment variables");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const { post_id } = await req.json();

    const { data: post, error: postError } = await supabase
        .from("social_posts" as any)
        .select("*, content_items(*)")
        .eq("id", post_id)
        .single();

    if (postError || !post) throw new Error("Could not find social post");

    // 1. Generate Social Caption via Groq
    const captionResult = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${groqKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a social media copywriter. Write a high-engagement LinkedIn/Instagram caption for an XR intel report. Include relevant hashtags." },
          { role: "user", content: `Article: ${post.content_items.title}\nKey Takeaways: ${post.content_items.excerpt}` }
        ]
      })
    });
    const captionData = await captionResult.json();
    const caption = captionData.choices[0].message.content;

    // 2. Publish to LinkedIn (Stub)
    // In reality, fetch LinkedIn token from 'integrations' table and call POST /v2/ugcPosts
    
    // 3. Publish to Meta/Instagram (Stub)
    // In reality, fetch Meta token and call POST /v1/media/carousel
    
    // 4. Update status to 'published'
    await supabase.from("social_posts" as any).update({ 
        status: 'published',
        live_urls: { linkedin: "https://linkedin.com/posts/placeholder", instagram: "https://instagram.com/p/placeholder" }
    }).eq("id", post_id);

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (error) {
    console.error("Error in social-publisher:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
