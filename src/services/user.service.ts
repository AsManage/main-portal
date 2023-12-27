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

export const getListUserPaging = async (payload: {
  limit?: number;
  page?: number;
}) => {
  return await centralGW.get("/user/info", { params: payload });
};

export const getUserDetail = async (userId: number) => {
  return await centralGW.get(`/user/info/${userId}`);
};

export const createUserInTenant = async (payload: {
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  city: string;
  province: string;
  workingPosition: string;
  phoneNumber: string;
  gender: string;
  status: string;
  roleId: string;
}) => {
  return await centralGW.post("/user/info", payload);
};

export const deleteUserInTenant = async (payload: { userId: number }) => {
  return await centralGW.delete("/user/info", {
    params: { userId: payload.userId },
  });
};
