export interface LoginReq {
  email: string;
  password: string;
}

export enum AUDIT_STATUS {
  UPCOMING = "UPCOMING",
  AUDITING = "AUDITING",
}
