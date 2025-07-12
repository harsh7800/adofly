export const generateAdContentPrompt = ({
  productName,
  description,
  productCategory,
  usps,
  campaignObjective,
  tone,
}: {
  productName: string;
  description: string;
  productCategory: string;
  usps: string[];
  campaignObjective: string;
  tone?: string;
}) => `
    You are an expert ad copywriter. Generate a high-converting ad for the following product.
    
    Product Name: ${productName}
    Description: ${description}
    Category: ${productCategory}
    Unique Selling Points: ${usps.join(", ")}
    Desired Call-To-Action: ${campaignObjective}
    Tone of Voice: ${tone}
    
    Write the ad to be persuasive, engaging, and suitable for paid social media ads.
    
    Return the output as JSON with:
    {
      "title": "...",
      "shortCopy": "...", // max 50 words
      "longCopy": "...", // max 150 words
      "callToActions": ["...", "...", "..."]
    }
    `;
export const generateTargetAudiencePrompt = ({
  productName,
  description,
  productCategory,
  ageRange,
  gender,
  locations,
}: {
  productName: string;
  description: string;
  productCategory: string;
  ageRange?: string;
  gender?: string[];
  locations?: string[];
}) => `
    You are a digital marketing strategist. Suggest the best target audience for the following product:
    
    Product Name: ${productName}
    Description: ${description}
    Category: ${productCategory}
    ${ageRange ? `Existing Age Range: ${ageRange}` : ""}
    ${
      gender && gender.length > 0
        ? `Preferred Genders: ${gender.join(", ")}`
        : ""
    }
    ${
      locations && locations.length > 0
        ? `Preferred Locations: ${locations.join(", ")}`
        : ""
    }
    
    Return output as JSON with:
    {
      "ageRange": "...",
      "genders": ["...", "..."],
      "locations": ["...", "..."],
      "interests": ["...", "..."]
    }
    `;

export const generateBudgetAllocationPrompt = ({
  productName,
  description,
  campaignObjective,
  audienceSize,
}: {
  productName: string;
  description: string;
  campaignObjective: string;
  audienceSize?: number;
}) => `
    You are a digital marketing budget planner. Suggest an optimal budget allocation for the following product:
    
    Product Name: ${productName}
    Description: ${description}
    Campaign Objective: ${campaignObjective}
    ${audienceSize ? `Estimated Audience Size: ${audienceSize}` : ""}
    
    Return output as JSON with:
    {
      "suggestedDailyBudget": "...",
      "suggestedTotalBudget": "..."
    }
    `;

export const generateImagePrompt = (
  productName: string,
  description: string
) => `
You are an AI image prompt engineer. Create a highly detailed and aesthetic prompt for generating a product image for:

Product Name: ${productName}
Description: ${description}

Return only the prompt text.
`;
