import { centralGW } from "./axios.service";

export const getListAssetPaging = async (payload: {
  limit?: number;
  page?: number;
}) => {
  return await centralGW.get("/asset", { params: payload });
};
