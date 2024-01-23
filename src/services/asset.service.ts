import { centralGW } from "./axios.service";

export const getListAssetPaging = async (payload: {
  limit?: number;
  page?: number;
  assetTypeId?: string;
  acquisitionSourceId?: string;
}) => {
  return await centralGW.get("/asset", { params: payload });
};

export const getDetailAsset = async (payload: { assetId: string }) => {
  return await centralGW.get(`/asset/${payload.assetId}`);
};

export const getListAcquisitionSource = async () => {
  return await centralGW.get("/asset/acquisition");
};

export const getListAssetCategory = async () => {
  return await centralGW.get("/asset/category");
};

export const getListAssetType = async (payload: {
  categoryId: string | number;
}) => {
  return await centralGW.get("/asset/type", {
    params: payload,
    isDisableLoading: true,
  });
};

export const createAsset = async (payload: {
  name?: string;
  quantity?: string;
  image?: string;
  originalCost?: string;
  specification?: string;
  isWarranty?: boolean;
  warrantyDuration?: string;
  timeUnit?: string;
  warrantyStartDate?: string;
  warrantyEndDate?: string;
  warrantyCondition?: string;
  note?: string;
  conditionState?: string;
  purchaseDate?: string;
  depreciationAmount?: string;
  usefulLife?: string;
  serialNumber?: string;
  acquisitionSourceId?: string;
  assetTypeId?: string;
  categoryId?: string;
}) => {
  return await centralGW.post("/asset", payload);
};

export const assignAssetToUser = async (payload: {
  assetId: string;
  toUserId: string;
  reason: string;
}) => {
  return await centralGW.post("/asset/assign", payload);
};

export const retrieveAsset = async (payload: {
  assetId: string;
  fromUserId: string;
}) => {
  return await centralGW.post("/asset/retrieve", {
    assetId: payload.assetId,
    fromUserId: payload.fromUserId,
  });
};

export const exportExcel = async () => {
  return await centralGW.get("/asset/export", {
    responseType: "blob",
  });
};

export const getListAuditSession = async () => {
  return await centralGW.get("/asset/audit-session");
};

export const getDetailAuditSession = async (sessionId: number) => {
  return await centralGW.get(`/asset/audit-session/${sessionId}`);
};

export const createAuditSession = async (payload: {
  name: string;
  startDate: string;
  endDate: string;
  assigneeId: string;
  note: string;
  assets: number[];
}) => {
  return await centralGW.post(`/asset/audit-session`, payload);
};

export const updateAuditSession = async (payload: {
  status: string;
  sessionId: number
}) => {
  return await centralGW.put(`/asset/audit-session`, payload);
};
