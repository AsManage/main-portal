import _ from "lodash";
import { LocalStorage } from "./localStorage";

const storage = new LocalStorage();

export const showData = (data: any) => {
  if (_.isNaN(data) || _.isNull(data) || _.isUndefined(data) || !data)
    return "-";
  else return data;
};

export const havePermission = (permission: string) => {
  const userInfo = storage.getStorageItem(storage.availableKey.ACCOUNT_INFO);
  if (userInfo) {
    const { permission: userPermissions } = userInfo;
    return Boolean(userPermissions?.includes(permission));
  }
  return false;
};

export const formatPrice = (price: number) => {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return USDollar.format(price);
};
