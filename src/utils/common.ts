import _ from "lodash";
import { LocalStorage } from "./localStorage";

const storage = new LocalStorage();

export const showData = (data: any) => {
  if (_.isNaN(data) || _.isNull(data) || _.isUndefined(data)) return "-";
  else return data;
};

export const havePermission = (permission: string) => {
  const userInfo = storage.getStorageItem(storage.availableKey.ACCOUNT_INFO);
  if (userInfo) {
    const { permission: userPermissions } = userInfo;
    return userPermissions?.includes(permission);
  }
  return false;
};
