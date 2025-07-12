import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodSchema } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseAIResponse<T>(content: unknown, schema: ZodSchema<T>): T {
  // Convert result.content into a string safely
  const contentStringRaw =
    typeof content === "string"
      ? content
      : Array.isArray(content)
      ? content.map((c) => (typeof c === "string" ? c : c?.text || "")).join("")
      : "";

  // Remove code block markers if present
  const contentString = contentStringRaw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // Parse JSON
  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(contentString);
  } catch (error) {
    console.error("[PARSE_AI_RESPONSE_JSON_ERROR]", error);
    throw new Error("Failed to parse AI response as JSON");
  }

  // Validate with provided Zod schema
  const parsed = schema.safeParse(parsedJson);
  if (!parsed.success) {
    console.error("[PARSE_AI_RESPONSE_SCHEMA_ERROR]", parsed.error.format());
    throw new Error("Invalid AI response format");
  }

  return parsed.data;
}
