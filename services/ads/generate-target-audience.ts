import { z } from "zod";
import { generateTargetAudiencePrompt } from "../langchain/prompts";
import { llm } from "../langchain/langchain-client";
import { parseAIResponse } from "@/lib/utils";

const TargetAudienceSchema = z.object({
  ageRange: z.string(),
  genders: z.array(z.string()),
  locations: z.array(z.string()),
  interests: z.array(z.string()),
});

export async function generateTargetAudience({
  productName,
  productDescription,
  productCategory,
  ageRange,
  gender,
  locations,
}: {
  productName: string;
  productDescription: string;
  productCategory: string;
  ageRange?: string;
  gender?: string[];
  locations?: string[];
}) {
  const prompt = generateTargetAudiencePrompt({
    productName,
    description: productDescription,
    productCategory,
    ageRange,
    gender,
    locations,
  });

  const result = await llm.call([{ role: "user", content: prompt }]);

  return parseAIResponse(result.content, TargetAudienceSchema);
}
