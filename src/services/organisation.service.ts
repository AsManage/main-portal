import { centralGW } from "./axios.service";

export const getTenantInfo = async () => {
  return await centralGW.get("/organisation/tenant");
};

export const getListOUnitType = async (payload: {
  limit?: number;
  page?: number;
}) => {
  return await centralGW.get("/organisation/orgUnitTypes", { params: payload });
};

export const createListOUnitType = async (payload: { name?: string }) => {
  return await centralGW.post("/organisation/orgUnitType", {
    name: payload.name,
  });
};

export const updateListOUnitType = async (payload: {
  name?: string;
  typeId: number;
}) => {
  return await centralGW.put("/organisation/orgUnitType", {
    name: payload.name,
    typeId: payload.typeId,
  });
};

export const deleteListOUnitType = async (payload: { typeId: number }) => {
  return await centralGW.delete("/organisation/orgUnitType", {
    params: {
      typeId: payload.typeId,
    },
  });
};

export const getOrganisationStructural = async () => {
  return await centralGW.get("/organisation/orgUnit");
};
