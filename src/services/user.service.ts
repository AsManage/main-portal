import { centralGW } from "./axios.service";

export const getListPermission = async () => {
  return await centralGW.get("/user/system-permission");
};
