import { AdCreativeType } from "@/schema/ad-creatives";
import { API } from "@/services/api-client";

export const createAdCreative = async (data: AdCreativeType) => {
  const response = await API.post("/api/ad-generation-stream", data);

  console.log("response.data: ", response.data);
  return response.data;
};
