import { IUserData } from "../user/user.interfaces";
import { Socket } from "net";

export interface IAuthData {
  id: number;
  userId: number;
  accessToken: string;
  refreshToken: string;
}
export interface AdditionalData {
  ip: string;
  userAgent: string;
  device: string;
  os: string;
  browser: string;
}
export interface AuthCreationAttrs {
  userId: number;
  accessToken: string;
  refreshToken: string;
  ip: string;
  userAgent: string;
  device: string;
  os: string;
  browser: string;
}
export interface ICustomRequest extends Request {
  user: IUserData;
  authedUser: IAuthData;
  socket: Socket;
  userData: AdditionalData;
  rawBody: Buffer
  userIp: string
}
