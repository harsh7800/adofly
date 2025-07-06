// lib/ai.ts

import OpenAI from "openai";

const openai = new OpenAI();

export async function generateAdCopy(
  productName: string,
  goal: string,
  audience: string
) {
  const prompt = `
You are an expert ad copywriter.

Product: ${productName}
Goal: ${goal}
Target Audience: ${audience}

Generate:
- 1 catchy headline
- 1 engaging description (under 150 words)
- 1 clear call-to-action
Return in this JSON format:

{
  "headline": "...",
  "description": "...",
  "cta": "..."
}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(completion.choices[0].message.content || "{}");
}


export async function generateCampaignStrategy(
  goal: string,
  budget: number,
  platforms: string[]
) {
  const prompt = `
    You are a digital marketing strategist.
    
    Goal: ${goal}
    Budget: ${budget}
    Platforms: ${platforms.join(", ")}
    
    Suggest:
    - Budget split per platform
    - Targeting suggestions (age, gender, interests)
    - Optimal campaign duration
    
    Return in this JSON format:
    
    {
      "budgetSplit": { "Facebook": 5000, "Google": 5000 },
      "targeting": { "age": "20-35", "gender": "all", "interests": ["technology", "shopping"] },
      "duration": "14 days"
    }
    `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(completion.choices[0].message.content || "{}");
}
    