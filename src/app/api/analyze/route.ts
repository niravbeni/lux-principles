import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { principles } from "@/data/principles";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW_MS = 60_000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

const SYSTEM_PROMPT = `You are an Experience Design AI assistant. You analyze real-world scenarios through the lens of six experience principles. Each principle has Do's (best practices) and Don'ts (pitfalls to avoid) that shape how you think and advise.

THE SIX PRINCIPLES:

${principles
  .map(
    (p) => `${p.id}: "${p.title}"
Description: ${p.description}
${p.dos.map((d) => `  DO: ${d.title} — ${d.detail}`).join("\n")}
${p.donts.map((d) => `  DON'T: ${d.title} — ${d.detail}`).join("\n")}`
  )
  .join("\n\n")}

INSTRUCTIONS:
1. Carefully read the user's scenario.
2. Write "generalAdvice": 2-3 sentences of holistic guidance on how to approach this scenario, drawing on the spirit of all six principles. Give enough context to feel substantive.
3. Pick the 1-3 principles MOST relevant to this specific scenario. Only pick more than 2 if genuinely warranted. Quality over quantity.
4. For each activated principle, write an "insight" of 2-3 sentences. This should:
   - Connect the principle directly to the scenario
   - Naturally weave in the thinking behind the Do's and Don'ts without labelling them as such
   - Feel like practical, scenario-specific advice — not a restatement of the principle
5. Return ONLY valid JSON matching this exact structure — no markdown, no code fences, no extra text:

{
  "activatedPrinciples": ["P1", "P3"],
  "generalAdvice": "Holistic guidance on approaching this scenario, considering the full picture across all principles. Written as a short flowing paragraph.",
  "guidance": [
    {
      "principleId": "P1",
      "title": "Lead with Accessible Expertise",
      "insight": "A short paragraph that ties this principle to the scenario, weaving in the spirit of the do's and don'ts naturally without labelling them."
    }
  ]
}

RULES:
- Always return valid JSON only.
- Never include markdown formatting or code fences.
- Never include conversational filler or explanations outside the JSON.
- The "activatedPrinciples" array must only contain IDs from P1-P6.
- Activate only 1-3 principles. Be selective — pick the ones that matter most for this scenario.
- Each guidance entry must reference an activated principle.
- Each "insight" should be 2-3 sentences. Be direct and practical — every sentence should add value.
- Do NOT use the words "Do" or "Don't" as labels. Incorporate their intent naturally into the advice.
- Keep language warm, professional, and action-oriented.`;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    // Validate request body
    const body = await request.json().catch(() => null);
    if (!body || typeof body.scenario !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid scenario." },
        { status: 400 }
      );
    }

    const scenario = body.scenario.trim();
    if (scenario.length === 0) {
      return NextResponse.json(
        { error: "Scenario cannot be empty." },
        { status: 400 }
      );
    }

    if (scenario.length > 2000) {
      return NextResponse.json(
        { error: "Scenario is too long. Please keep it under 2000 characters." },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "AI service is not configured. Please add an OpenAI API key." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: scenario },
      ],
      temperature: 0.5,
      max_tokens: 1600,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "No response from AI. Please try again." },
        { status: 500 }
      );
    }

    // Parse the JSON response
    let parsed;
    try {
      // Strip any potential markdown code fences the model might add despite instructions
      const cleaned = content
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    // Validate structure
    if (
      !Array.isArray(parsed.activatedPrinciples) ||
      !Array.isArray(parsed.guidance) ||
      typeof parsed.generalAdvice !== "string"
    ) {
      console.error("Invalid AI response structure:", parsed);
      return NextResponse.json(
        { error: "Invalid AI response format. Please try again." },
        { status: 500 }
      );
    }

    // Filter to valid principle IDs only
    const validIds = principles.map((p) => p.id);
    parsed.activatedPrinciples = parsed.activatedPrinciples.filter(
      (id: string) => validIds.includes(id)
    );

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
