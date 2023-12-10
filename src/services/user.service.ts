import { centralGW } from "./axios.service";

export const getListPermission = async () => {
  return await centralGW.get("/user/system-permission");
};

export const getListRole = async () => {
  return await centralGW.get("/user/role");
};

export const deleteRole = async (roleId: number) => {
  return await centralGW.delete("/user/role", {
    params: {
      roleId,
    },
  });
};
