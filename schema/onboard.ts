import z from "zod";

// ✅ Zod Schema
export const onboardingSchema = z.object({
  primaryUseCases: z
    .array(z.string())
    .min(1, { message: "Select at least one use case" }),
  primaryUseCaseOther: z.string().optional(),
  role: z.string().min(1, { message: "Select your role" }),
  roleOther: z.string().optional(),
  industry: z.string().min(1, { message: "Select your industry" }),
  teamSize: z.string().min(1, { message: "Select your team size" }),
  country: z.string().min(1, { message: "Enter your country or region" }),
  primaryGoal: z.string().min(1, { message: "Enter your primary goal" }),
  hearAboutUs: z.string().min(1, { message: "Select how you heard about us" }),
  hearAboutUsOther: z.string().optional(),
});

export type OnboardingFormType = z.infer<typeof onboardingSchema>;
