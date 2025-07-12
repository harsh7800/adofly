/* eslint-disable @typescript-eslint/no-explicit-any */
import { createGraph } from "langgraph";
import { generateAdContent } from "@/services/ads/generate-ads-copy";
import { generateTargetAudience } from "@/services/ads/generate-target-audience";
import { generateBudgetAllocation } from "@/services/ads/budget-allocations";
// import { generateImage } from "@/services/ads/generate-image"; // If needed

type AdGenerationInput = {
  productName: string;
  productDescription: string;
  productCategory: string;
  usps: string[];
  campaignObjective: string;
  tone?: string;
  ageRange?: string;
  gender?: string[];
  locations?: string[];
};

export const adGenerationGraph = createGraph<AdGenerationInput, any>(
  async (input, emit) => {
    emit({ phase: "generating-copy" });
    const adCopy = await generateAdContent(input);
    emit({ adCopy });

    emit({ phase: "generating-audience" });
    const targetAudience = await generateTargetAudience({
      ...input,
      ageRange: input.ageRange || "",
      gender: input.gender || [],
      locations: input.locations || [],
    });
    emit({ targetAudience });

    emit({ phase: "generating-budget" });
    const budget = await generateBudgetAllocation({
      productName: input.productName,
      productDescription: input.productDescription,
      campaignObjective: input.campaignObjective,
    });
    emit({ budget });

    // Optional: Image generation
    // emit({ phase: "generating-image" });
    // const imageUrl = await generateImage(input);
    // emit({ imageUrl });

    emit({ phase: "finalizing" });

    return {
      adCopy,
      targetAudience,
      budget,
      // imageUrl,
      phase: "complete",
    };
  }
);
