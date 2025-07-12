import { AdGenerationStep } from "@/app/(root)/ads/_components/ad-generation-progress";

type Action =
  | { type: "START_STEP"; id: string }
  | { type: "COMPLETE_STEP"; id: string }
  | { type: "ERROR_STEP"; id: string }
  | { type: "RESET"; initial: AdGenerationStep[] };

export function adGenerationReducer(
  state: AdGenerationStep[],
  action: Action
): AdGenerationStep[] {
  switch (action.type) {
    case "START_STEP":
      return state.map((step) =>
        step.id === action.id
          ? { ...step, status: "active" }
          : step.status === "active"
          ? { ...step, status: "completed" }
          : step
      );

    case "COMPLETE_STEP":
      return state.map((step) =>
        step.id === action.id ? { ...step, status: "completed" } : step
      );

    case "ERROR_STEP":
      return state.map((step) =>
        step.id === action.id ? { ...step, status: "error" } : step
      );

    case "RESET":
      return action.initial;

    default:
      return state;
  }
}
