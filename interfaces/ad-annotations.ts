// src/types/adAnnotations.ts

export type AdGenerationStepStatus =
  | "pending"
  | "active"
  | "completed"
  | "error";

export interface AdGenerationStep {
  id: string; // e.g. "ad-copy", "target-audience"
  title: string; // UI display title
  status: AdGenerationStepStatus;
}
