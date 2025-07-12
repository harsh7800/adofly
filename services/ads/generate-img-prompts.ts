import { llm } from "../langchain/langchain-client";
import { generateImagePrompt } from "../langchain/prompts";

export async function generateImageGenerationPrompt(
  productName: string,
  description: string
) {
  const prompt = generateImagePrompt(productName, description);
  const result = await llm.call([{ role: "user", content: prompt }]);

  return result.content.trim();
}
