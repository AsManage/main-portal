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

export const addOUnit = async (payload: {
  name: string;
  state: string;
  description: string;
  areaOfOperation: string;
  businessFunctionDescription: string;
  organisationUnitTypeId: string;
  parentId: string;
  sortId: string;
}) => {
  return await centralGW.post("/organisation/orgUnit", payload);
};

export const updateOUnit = async (payload: {
  name: string;
  state: string;
  description: string;
  areaOfOperation: string;
  businessFunctionDescription: string;
  organisationUnitTypeId: string;
  ouId: string;
}) => {
  return await centralGW.put("/organisation/orgUnit", payload);
};

export const deleteOUnit = async (payload: { ouId: string }) => {
  return await centralGW.delete("/organisation/orgUnit", { params: payload });
};

export const getLocationStructural = async () => {
  return await centralGW.get("/organisation/location");
};

export const addLocation = async (payload: {
  name: string;
  state: string;
  code: string;
  description: string;
  businessFunctionDescription: string;
  parentId: string;
  sortId: string;
}) => {
  const {
    businessFunctionDescription,
    code,
    description,
    name,
    parentId,
    sortId,
    state,
  } = payload;

  return await centralGW.post("/organisation/location", {
    name,
    code,
    state,
    description,
    businessFunctionDescription,
    locationHierarchy: {
      parentId,
      sortId,
    },
  });
};
