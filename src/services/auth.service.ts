import { LoginReq } from "interfaces/auth.interface";
import { centralGW } from "./axios.service";

export const login = async (payload: LoginReq) => {
  return await centralGW.post("/auth", payload);
};

export const validateLogin = async () => {
  return await centralGW.get("/auth");
};

export const sendVerifyCode = async (payload: { email: string }) => {
  return await centralGW.post("/auth/account/otp", payload);
};

export const verifyCode = async (payload: { email: string; code: string }) => {
  return await centralGW.post("/auth/account/otp/verify", payload);
};

export const changePassword = async (payload: {
  email: string;
  password: string;
  resetToken: string;
}) => {
  return await centralGW.post("/auth/account/change-password", payload);
};
