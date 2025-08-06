import { Injectable } from "@nestjs/common";
import { IUserData } from "src/modules/user/user.interfaces";
import * as jwt from "jsonwebtoken";

import { ITokenPair } from "./interfaces";
import { CustomException } from "../../exceptions/custom.exception";
import { ErrorCodes } from "src/enums/exception.enums";
import { SubscriptionExceptionCodes, TokenType } from "./enums";
import { ModuleType } from "src/common/exceptions/enums";

@Injectable()
export class TokenService {
  generateTokenPair(encodeData: Partial<IUserData>): ITokenPair {
    const accessToken = jwt.sign(
      encodeData,
      process.env.ACCESS_TOKEN_SECRET || "",
      {
        expiresIn: "20m",
      }
    );
    const refreshToken = jwt.sign(
      encodeData,
      process.env.REFRESH_TOKEN_SECRET || "",
      {
        expiresIn: "7d",
      }
    );
    return { accessToken, refreshToken };
  }

  generateActionToken(encodeData: Partial<IUserData>): string {
    const actionToken = jwt.sign(
      encodeData,
      process.env.ACTION_TOKEN_SECRET || "",
      {
        expiresIn: "1h",
      }
    );
    return actionToken;
  }

  validateToken(token: string, tokenType: string = TokenType.ACCESS_TOKEN) {
    let secretWorld = process.env.ACCESS_TOKEN_SECRET || "";
    if (tokenType === TokenType.REFRESH_TOKEN) {
      secretWorld = process.env.REFRESH_TOKEN_SECRET || "";
    }
    if (tokenType === TokenType.ACTION_TOKEN) {
      secretWorld = process.env.ACTION_TOKEN_SECRET || "";
    }
    try {
      const decoded = jwt.verify(token, secretWorld);
      return decoded;
    } catch (error) {
      throw new CustomException({
        message: error.message,
        statusCode: 401,
        errorCode: SubscriptionExceptionCodes.INVALID_TOKEN,
        module: ModuleType.TOKEN_MODULE,
        details: { error: error.message },
      });
    }
  }
}
