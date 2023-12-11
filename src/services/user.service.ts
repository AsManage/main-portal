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

export const createRole = async ({
  roleName,
  permissions,
}: {
  roleName: string;
  permissions: number[];
}) => {
  return await centralGW.post("/user/role", {
    roleName,
    permissionIds: permissions,
  });
};

export const updateRole = async ({
  roleId,
  roleName,
  permissions,
}: {
  roleId: number;
  roleName: string;
  permissions: number[];
}) => {
  return await centralGW.put("/user/role", {
    roleId,
    roleName,
    permissionIds: permissions,
  });
};
