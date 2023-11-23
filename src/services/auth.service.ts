import { LoginReq } from "interfaces/auth.interface";
import { centralGW } from "./axios.service";

export const login = async (payload: LoginReq) => {
  return await centralGW.post("/auth", payload);
};
