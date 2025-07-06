import { OnboardingFormType } from "@/schema/onboard";
import { API } from "@/services/api-client";

export const createAccountSetup = async (data: OnboardingFormType) => {
  const response = await API.post("/api/account-setup", data);

  return response.data;
};
