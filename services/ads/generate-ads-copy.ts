import { parseAIResponse } from "@/lib/utils";
import { llm } from "../langchain/langchain-client";
import { generateAdContentPrompt } from "../langchain/prompts";
import z from "zod";

const AdContentSchema = z.object({
  title: z.string(),
  shortCopy: z.string(),
  longCopy: z.string(),
  callToActions: z.array(z.string()),
});

export async function generateAdContent({
  productName,
  productDescription,
  productCategory,
  usps,
  campaignObjective,
  tone,
}: {
  productName: string;
  productDescription: string;
  productCategory: string;
  usps: string[];
  campaignObjective: string;
  tone?: string;
}) {
  const prompt = generateAdContentPrompt({
    productName,
    description: productDescription,
    productCategory,
    usps,
    campaignObjective,
    tone,
  });

  const result = await llm.call([{ role: "user", content: prompt }]);

  // ✅ Use reusable parser here
  return parseAIResponse(result.content, AdContentSchema);
}
