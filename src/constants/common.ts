export enum STORAGE_KEY {
  ACCESS_TOKEN = "access-token",
  ACCOUNT_INFO = "account-info",
}

export const DEFAULT_FORMAT_DATE = "DD/MM/YYYY";

export const LIMIT_LIST = [5, 10, 25, 50, 100];

export const PERMISSION_LABEL_MAPPING = {
  business: "BUSINESS",
  "organisation-unit-tab": "ORGANISATION UNIT TAB",
  "organisation-unit-type": "ORGANISATION UNIT TYPE TAB",
  "organisation-location": "ORGANISATION LOCATION TAB",
  permission: "PERMISSION & ROLE",
  user: "USER",
  feature: "SIDEBAR FEATURE",
};

export const PERMISSION = {
  VIEW_BUSINESS_INFORMATION: "VIEW_BUSINESS_INFORMATION",
  ACCESS_ORGANISATION_UNIT_TAB: "ACCESS_ORGANISATION_UNIT_TAB",
  ADD_ORGANISATION_UNIT: "ADD_ORGANISATION_UNIT",
  EDIT_ORGANISATION_UNIT: "EDIT_ORGANISATION_UNIT",
  DELETE_ORGANISATION_UNIT: "DELETE_ORGANISATION_UNIT",
  VIEW_ORGANISATION_UNIT: "VIEW_ORGANISATION_UNIT",
  ACCESS_ORGANISATION_UNIT_TYPE_TAB: "ACCESS_ORGANISATION_UNIT_TYPE_TAB",
  ADD_ORGANISATION_UNIT_TYPE: "ADD_ORGANISATION_UNIT_TYPE",
  EDIT_ORGANISATION_UNIT_TYPE: "EDIT_ORGANISATION_UNIT_TYPE",
  DELETE_ORGANISATION_UNIT_TYPE: "DELETE_ORGANISATION_UNIT_TYPE",
  VIEW_ORGANISATION_UNIT_TYPE: "VIEW_ORGANISATION_UNIT_TYPE",
  ACCESS_ORGANISATION_LOCATION_TAB: "ACCESS_ORGANISATION_LOCATION_TAB",
  ADD_ORGANISATION_LOCATION: "ADD_ORGANISATION_LOCATION",
  EDIT_ORGANISATION_LOCATION: "EDIT_ORGANISATION_LOCATION",
  DELETE_ORGANISATION_LOCATION: "DELETE_ORGANISATION_LOCATION",
  VIEW_ORGANISATION_LOCATION: "VIEW_ORGANISATION_LOCATION",
  ACCESS_PERMISSION: "ACCESS_PERMISSION",
  VIEW_SYSTEM_PERMISSION: "VIEW_SYSTEM_PERMISSION",
  ADD_ROLE: "ADD_ROLE",
  EDIT_ROLE: "EDIT_ROLE",
  DELETE_ROLE: "DELETE_ROLE",
  ACCESS_USER_LIST: "ACCESS_USER_LIST",
  VIEW_USER_LIST: "VIEW_USER_LIST",
  ADD_USER: "ADD_USER",
  DELETE_USER: "DELETE_USER",
  EDIT_USER: "EDIT_USER",
  BUSINESS: "BUSINESS",
  ORGANIZATION: "ORGANIZATION",
  PERMISSION: "PERMISSION",
  USER: "USER",
};
