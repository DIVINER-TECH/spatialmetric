import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateRequest {
  type: 'article' | 'market-brief' | 'startup-profile';
  topic?: string;
  region?: string;
  category?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { type, topic, region, category } = await req.json() as GenerateRequest;

    let systemPrompt = '';
    let userPrompt = '';

    if (type === 'article') {
      systemPrompt = `You are a senior analyst at SpatialMetrics, a leading spatial computing investment intelligence platform. It is December 2025. Generate professional, data-driven content about XR/VR/AR markets with specific metrics, statistics, and investment insights. Use a professional, analytical tone without bold or italic formatting. Include specific numbers, percentages, and market data. Focus on ${region || 'global'} markets. All text should be plain without emphasis markers. Reference recent 2025 developments including Apple Vision Pro 2, Meta Quest 4, Android XR ecosystem, and emerging AI-XR convergence.`;
      
      userPrompt = `Generate a comprehensive market intelligence article about: ${topic || 'XR market trends in Q4 2025'}

Category: ${category || 'market-intelligence'}
Region focus: ${region || 'Global'}
Current date: December 2025

Include:
1. Key market statistics and metrics with specific numbers
2. Investment implications and strategic recommendations  
3. Key takeaways (4-5 detailed bullet points)
4. Relevant companies mentioned with context
5. Forward-looking analysis for 2026

Format as JSON with fields: title, excerpt (2 sentences), content (plain text markdown without bold/italic, 500-600 words), keyTakeaways (array of strings), tags (array), metrics (array of {label, value}).

IMPORTANT: Do not use ** or * for emphasis. Write in plain text only.`;
    } else if (type === 'market-brief') {
      systemPrompt = `You are a market analyst providing real-time XR market intelligence. It is December 2025. Generate brief, actionable market updates with specific data points. Use plain text without bold or italic formatting. Reference current market conditions including Vision Pro 2 adoption, Quest 4 launch, enterprise XR growth, and AI-XR integration trends.`;
      
      userPrompt = `Generate a brief market update for ${region || 'global'} XR markets as of December 2025.

Include:
1. Top 3 market movers with specific context
2. Key metrics with specific numbers and percentages
3. Investment signal (bullish/bearish/neutral) with reasoning

Format as JSON with fields: headline (plain text, no emphasis), summary (2-3 sentences, plain text), metrics (array of {label, value, change}), signal.

IMPORTANT: Do not use ** or * for emphasis. Write in plain text only.`;
    } else if (type === 'startup-profile') {
      systemPrompt = `You are a venture analyst specializing in spatial computing startups. It is December 2025. Generate detailed startup profiles with investment-relevant information. Use plain text without bold or italic formatting. Consider the current funding environment and 2025 market conditions.`;
      
      userPrompt = `Generate a startup profile for a promising XR company in the ${region || 'NA'} region focusing on ${topic || 'enterprise XR solutions'}.

Include:
1. Company name and detailed description
2. Key metrics (funding raised, employees, growth rate, revenue if applicable)
3. Product/market fit assessment with competitive positioning
4. Investment thesis with risk factors

Format as JSON with fields: name, description, sector, stage, metrics (object), products (array), investmentThesis.

IMPORTANT: Do not use ** or * for emphasis. Write in plain text only.`;
    }

    console.log(`Generating ${type} content for topic: ${topic}, region: ${region}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits required. Please add funds to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;
    
    // Try to parse as JSON, otherwise return raw
    let parsedContent;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = generatedContent.match(/```json\n?([\s\S]*?)\n?```/) || 
                        generatedContent.match(/```\n?([\s\S]*?)\n?```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : generatedContent;
      parsedContent = JSON.parse(jsonStr);
    } catch {
      parsedContent = { raw: generatedContent };
    }

    console.log(`Successfully generated ${type} content`);

    return new Response(JSON.stringify({ 
      success: true, 
      type,
      data: parsedContent,
      generatedAt: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error generating content:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
