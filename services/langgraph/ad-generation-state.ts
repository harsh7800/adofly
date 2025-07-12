import { Annotation } from "@langchain/langgraph";
import { AdCopy, TargetAudience, BudgetSuggestion } from "@/types/ads"; // define these interfaces

export type AdGenerationPhase =
  | "initializing"
  | "generating-copy"
  | "generating-audience"
  | "generating-budget"
  | "generating-image"
  | "finalizing"
  | "complete"
  | "error";

export const AdGenerationStateAnnotation = Annotation.Root({
  // Input
  productName: Annotation<string>({
    reducer: (_, y) => y ?? "",
    default: () => "",
  }),
  productDescription: Annotation<string>({
    reducer: (_, y) => y ?? "",
    default: () => "",
  }),

  // Process
  adCopy: Annotation<AdCopy | undefined>({
    reducer: (_, y) => y ?? _,
    default: () => undefined,
  }),
  targetAudience: Annotation<TargetAudience | undefined>({
    reducer: (_, y) => y ?? _,
    default: () => undefined,
  }),
  budget: Annotation<BudgetSuggestion | undefined>({
    reducer: (_, y) => y ?? _,
    default: () => undefined,
  }),
  imageUrl: Annotation<string | undefined>({
    reducer: (_, y) => y ?? _,
    default: () => undefined,
  }),

  // Control
  phase: Annotation<AdGenerationPhase>({
    reducer: (_, y) => y ?? _,
    default: () => "initializing" as AdGenerationPhase,
  }),
  error: Annotation<string | undefined>({
    reducer: (_, y) => y ?? _,
    default: () => undefined,
  }),
});
