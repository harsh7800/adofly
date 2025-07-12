// src/app/api/generate-high-converting-ad/route.ts

import { NextResponse } from "next/server";
import { AdCreativeSchema } from "@/schema/ad-creatives";
import { generateAdContent } from "@/services/ads/generate-ads-copy";
import { generateTargetAudience } from "@/services/ads/generate-target-audience";
import { generateBudgetAllocation } from "@/services/ads/budget-allocations";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Validate input
    const parsed = AdCreativeSchema.parse(body);

    const {
      productName,
      productDescription,
      imageOption,
      // imageFile,
      // aiImageStyle,
      // aiImageDescription,
      ageRange,
      gender,
      locations,
      productCategory,
      usps,
      campaignObjective,
      tone,
    } = parsed;

    console.log("started generating ad creative...");
    // ✅ Generate Ad Copy with enhanced context
    const adCopy = await generateAdContent({
      productName,
      productDescription,
      productCategory,
      usps,
      campaignObjective,
      tone,
    });

    // ✅ Generate Target Audience
    const targetAudience = await generateTargetAudience({
      productName,
      productDescription,
      productCategory,
      ageRange,
      gender,
      locations,
    });

    // ✅ Generate Budget Allocation
    const budget = await generateBudgetAllocation({
      productName,
      productDescription,
      campaignObjective,
    });

    // ✅ Combine into final high-converting ad creative
    const finalAdCreative = {
      adCopy,
      imageOption,
      targetAudience,
      budget,
      cta: campaignObjective,
      tone,
      usps,
      productCategory,
    };

    console.log("finalAdCreative: ", finalAdCreative);
    console.log("finished generating ad creative...");
    return NextResponse.json(finalAdCreative, { status: 200 });
  } catch (error) {
    console.error("[GENERATE_HIGH_CONVERTING_AD_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to generate ad. " + (error as Error).message },
      { status: 500 }
    );
  }
}
