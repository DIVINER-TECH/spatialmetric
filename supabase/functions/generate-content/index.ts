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
  wordCount?: number;
  searchResults?: string; // Optional client-side results
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not configured");
    }

    const { type, topic, region, category, wordCount = 800, searchResults: clientSearchResults } = await req.json() as GenerateRequest;

    // --- LIVE SEARCH INTEGRATION (TAVILY) ---
    let finalSearchResults = clientSearchResults || "";
    const TAVILY_API_KEY = Deno.env.get("TAVILY_API_KEY");

    if (TAVILY_API_KEY && !finalSearchResults) {
      try {
        let searchQuery = "";
        if (type === 'article') {
          searchQuery = `${topic || 'spatial computing market trends'} ${region || ''} latest items news statistics`;
        } else if (type === 'market-brief') {
          searchQuery = `XR spatial computing market news deals funding ${region || 'global'} last week`;
        } else if (type === 'startup-profile') {
          searchQuery = `${topic || 'promising XR startups'} ${region || ''} funding metrics details`;
        }

        console.log(`Performing live search for: "${searchQuery}"...`);

        const searchResponse = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: TAVILY_API_KEY,
            query: searchQuery,
            search_depth: "basic",
            include_answer: true,
            max_results: 5
          })
        });

        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          // Format results for the LLM
          const articles = searchData.results.map((r: any) => `- "${r.title}": ${r.content}`).join("\n");
          finalSearchResults = `Real-time Context:\n${searchData.answer || ''}\n\nSources:\n${articles}`;
          console.log("Live search successful.");
        } else {
          console.warn("Tavily search failed:", searchResponse.status);
        }
      } catch (searchError) {
        console.error("Search integration error:", searchError);
        // Continue without search results rather than failing
      }
    }
    // ----------------------------------------

    let systemPrompt = '';
    let userPrompt = '';

    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const contextInstruction = finalSearchResults
      ? `\n\nUSE THE FOLLOWING REAL-TIME SEARCH RESULTS TO INFORM YOUR CONTENT:\n${finalSearchResults}\n\nPrioritize these search results for latest facts and figures.`
      : '';

    if (type === 'article') {
      systemPrompt = `You are a senior analyst at SpatialMetrics, a leading spatial computing investment intelligence platform. Today is ${currentDate}. You generate professional, data-driven investment research content about XR/VR/AR/spatial computing markets.

CRITICAL FORMATTING RULES:
- Write in PLAIN TEXT only - NO markdown emphasis (no ** or * for bold/italic)
- NO numbered lists with periods (1. 2. 3.) - use prose paragraphs instead
- NO bullet points - write in flowing paragraphs
- Use proper section headers with ## for main sections and ### for subsections
- Write exactly ${wordCount} words minimum
- Include specific numbers, percentages, dollar amounts, and market data
- Reference specific companies, deals, analysts, and events
- Use professional, analytical investment research tone
- Include attributed expert quotes with analyst/executive names
${contextInstruction}

CONTENT STRUCTURE (required sections):
1. Executive Summary (overview paragraph)
2. Market Analysis (detailed market dynamics with metrics)
3. Key Players and Deals (specific companies and investment amounts)
4. Investment Implications (actionable insights)
5. Outlook and Projections (forward-looking analysis)`;

      userPrompt = `Generate a comprehensive ${wordCount}+ word market intelligence article about: ${topic || 'XR market trends'}

Category: ${category || 'market-intelligence'}
Region focus: ${region || 'Global'}
Current date: ${currentDate}

REQUIRED ELEMENTS:
- At least 5 specific company mentions with context
- At least 3 specific funding amounts or valuations
- At least 2 attributed expert quotes (name, title, organization)
- Specific YoY growth percentages
- Market size projections for 2026
- Competitive landscape analysis
- Risk factors and opportunities

Format response as JSON:
{
  "title": "Clear, professional headline (no emoji)",
  "excerpt": "2-3 sentence summary with key metric",
  "content": "Full article content in plain text with ## headers, ${wordCount}+ words",
  "keyTakeaways": ["5 detailed bullet points with specific data"],
  "tags": ["5-7 relevant tags"],
  "metrics": [{"label": "Metric Name", "value": "$X.XB or XX%"}]
}

IMPORTANT: The content field must be ${wordCount}+ words. Count carefully.`;

    } else if (type === 'market-brief') {
      systemPrompt = `You are a market analyst providing real-time XR market intelligence. Today is ${currentDate}. Generate actionable market updates with specific data points. Use plain text without any bold or italic formatting.${contextInstruction}`;

      userPrompt = `Generate a market brief for ${region || 'global'} XR markets.

Include:
1. Top 3 market movers with specific context and numbers
2. Key metrics with percentages and dollar amounts
3. Investment signal (bullish/bearish/neutral) with detailed reasoning
4. Notable deals or announcements from the past week

Format as JSON:
{
  "headline": "Brief headline (plain text)",
  "summary": "3-4 sentence summary with specific data",
  "metrics": [{"label": "Metric", "value": "Value", "change": "+X%"}],
  "signal": "bullish/bearish/neutral",
  "reasoning": "2-3 sentences explaining signal"
}`;

    } else if (type === 'startup-profile') {
      systemPrompt = `You are a venture analyst specializing in spatial computing startups. Today is ${currentDate}. Generate detailed startup profiles suitable for investor due diligence. Use plain text without bold or italic formatting.${contextInstruction}`;

      userPrompt = `Generate a detailed startup profile for a promising XR company in ${region || 'NA'} focusing on ${topic || 'enterprise XR solutions'}.

Include:
1. Company overview and founding story
2. Product/service description with technical details
3. Market opportunity and competitive positioning
4. Funding history with specific amounts and investors
5. Key metrics (ARR, growth rate, customers, employees)
6. Investment thesis with bull and bear cases
7. Risk factors and moat analysis

Format as JSON:
{
  "name": "Company Name",
  "description": "Detailed 150+ word description",
  "sector": "Primary sector",
  "stage": "Seed/Series A/B/C/D",
  "founded": 2023,
  "headquarters": "City, Country",
  "metrics": {
    "funding": "$XXM",
    "employees": XX,
    "customers": XX,
    "arr": "$XM",
    "growth": "XX% YoY"
  },
  "investors": ["List of key investors"],
  "products": ["Product 1", "Product 2"],
  "investmentThesis": "Detailed thesis paragraph",
  "risks": ["Risk 1", "Risk 2"],
  "keyPeople": [{"name": "CEO Name", "title": "CEO", "background": "Brief bio"}]
}`;
    }

    console.log(`Generating ${type} content for topic: ${topic}, region: ${region}, wordCount: ${wordCount} using Groq`);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 6000,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(JSON.stringify({
          error: "Rate limit exceeded. Please try again in a few minutes.",
          retryAfter: 60
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Parse JSON from response
    let parsedContent;
    try {
      // Clean up potential markdown code blocks
      const cleanContent = generatedContent.replace(/```json\n?|\n?```/g, '');
      parsedContent = JSON.parse(cleanContent);

      // Add AI author attribution & metadata
      parsedContent.author = {
        name: "SpatialMetrics AI",
        avatar: "AI",
        title: "AI Research Analyst"
      };

      // Calculate reading time from content
      if (parsedContent.content) {
        const wordCount = parsedContent.content.split(/\s+/).length;
        parsedContent.readTime = Math.ceil(wordCount / 220);
        parsedContent.wordCount = wordCount;
      }

    } catch (e) {
      console.error("Failed to parse JSON:", e);
      parsedContent = { raw: generatedContent, parseError: true };
    }

    // Return successful response
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
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
