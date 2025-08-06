import { SetMetadata } from "@nestjs/common";
import { TokenType } from "src/common/auth/token/enums";

export const tokenType = (type: string = TokenType.ACCESS_TOKEN) =>
  SetMetadata("tokenType", type);
