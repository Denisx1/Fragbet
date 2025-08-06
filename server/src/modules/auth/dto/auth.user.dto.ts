import { IAuthData } from "../auth.interfaces";

export class AuthUserDto {
  readonly email: string;
  readonly password: string;
}

export class LoginUserDto {
  id: number;
  userId: number;
  accessToken: string;
  refreshToken: string;
  
  setData(user: IAuthData) {
    this.id = user.id;
    this.userId = user.userId;
    this.accessToken = user.accessToken;
    this.refreshToken = user.refreshToken;
  }
}
