import { centralGW } from "./axios.service";

export const getTenantInfo = async () => {
  return await centralGW.get("/organisation/tenant");
};
