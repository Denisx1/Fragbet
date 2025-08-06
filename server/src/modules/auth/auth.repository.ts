import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Auth } from "./auth.model";
import {
  AdditionalData,
  AuthCreationAttrs,
  IAuthData,
} from "./auth.interfaces";
import { ITokenPair } from "src/common/auth/token/interfaces";

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(Auth) private readonly authModel: typeof Auth) {}

  async login(
    userId: number,
    tokenPair: ITokenPair,
    additionalData: AdditionalData
  ): Promise<IAuthData> {
    const createdAuth = await this.authModel.create({
      userId,
      accessToken: tokenPair.accessToken ?? "",
      refreshToken: tokenPair.refreshToken ?? "",
      ...additionalData,
    });
    return createdAuth;
  }
  async logout(authedUserId: Partial<IAuthData>): Promise<number> {
    const deleted = await this.authModel.destroy({
      where: { id: authedUserId.id },
    });
    return deleted;
  }
  async refresh(
    authedUser: Pick<IAuthData, "id" | "userId">,
    tokenPair: ITokenPair,
    additionalData: AdditionalData
  ): Promise<IAuthData> {
    await this.authModel.destroy({
      where: { id: authedUser.id },
    });
    const createdAuth = await this.authModel.create({
      userId: authedUser.userId,
      ...tokenPair,
      ...additionalData,
    });
    return createdAuth;
  }

  async getUserByToken(
    token: ITokenPair,
    tokenType: string
  ): Promise<IAuthData | null> {
    const user = await this.authModel.findOne({
      where: { [tokenType]: token },
      include: ["user"],
    });
    return user;
  }
}
