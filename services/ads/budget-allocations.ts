import { z } from "zod";
import { generateBudgetAllocationPrompt } from "../langchain/prompts";
import { llm } from "../langchain/langchain-client";
import { parseAIResponse } from "@/lib/utils";

const BudgetSchema = z.object({
  suggestedDailyBudget: z.string(),
  suggestedTotalBudget: z.string(),
});

export async function generateBudgetAllocation({
  productName,
  productDescription,
  campaignObjective,
  audienceSize,
}: {
  productName: string;
  productDescription: string;
  campaignObjective: string;
  audienceSize?: number;
}) {
  const prompt = generateBudgetAllocationPrompt({
    productName,
    description: productDescription,
    campaignObjective,
    audienceSize,
  });

  const result = await llm.call([{ role: "user", content: prompt }]);

  return parseAIResponse(result.content, BudgetSchema);
}
