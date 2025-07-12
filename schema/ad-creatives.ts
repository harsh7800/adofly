import { z } from "zod";

export const AdCreativeSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productDescription: z.string().min(1, "Product description is required"),
  imageOption: z.enum(["upload", "generate", "generate-with-reference"]),
  // imageFile: z
  //   .any()
  //   .nullable()
  //   .refine(
  //     (file) => file instanceof File || file === null,
  //     "Invalid file type"
  //   )
  //   .optional(),
  aiImageStyle: z.string().optional(),
  aiImageDescription: z.string().optional(),
  ageRange: z.string().optional(),
  gender: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(),

  // ✨ NEW FIELDS
  productCategory: z.string().min(1, "Product category is required"),
  usps: z.array(z.string()).min(1, "At least one USP is required"),
  campaignObjective: z.string().min(1, "Campaign objective is required"),
  tone: z.string().optional(),
});

export type AdCreativeType = z.infer<typeof AdCreativeSchema>;
