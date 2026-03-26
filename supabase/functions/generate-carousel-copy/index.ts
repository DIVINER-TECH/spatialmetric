import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const groqAIRequest = async (apiKey: string, systemPrompt: string, userPrompt: string) => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.6,
      response_format: { type: "json_object" }
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${response.status} ${error}`);
  }

  const data = await response.json();
  const content = data.choices! [0].message.content;
  return JSON.parse(content);
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
    const { record } = await req.json(); // Triggered by Webhook, contains the record

    if (!record || record.type !== 'article') {
      return new Response(JSON.stringify({ message: "Not an article, skipping" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // 1. Generate Carousel Copy via Groq
    const carouselResult = await groqAIRequest(groqKey,
      "You are a high-end social media strategist for a venture capital firm. Convert technical articles into viral slide carousels. Return exactly 5 slides. Format: { \"slides\": [ { \"id\": 1, \"headline\": \"string\", \"body\": \"max 15 words\", \"call_to_action\": \"string\" } ] }",
      `Distill this article into 5 punchy slides:\n\nTITLE: ${record.title}\nCONTENT: ${record.content.substring(0, 3000)}`
    );

    // 2. Clear previous attempts and Insert into social_posts
    const { data: post, error: postError } = await supabase
      .from("social_posts")
      .upsert({
        content_item_id: record.id,
        status: 'draft',
        carousel_copy: carouselResult.slides,
      }, { onConflict: 'content_item_id' })
      .select()
      .single();

    if (postError) throw postError;

    // 3. (Optional/Future) Trigger Canva Render here
    // For now, we stop at Copy Generation as per Phase 2

    return new Response(JSON.stringify({ success: true, post_id: post.id }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (error) {
    console.error("Error in generate-carousel-copy:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
