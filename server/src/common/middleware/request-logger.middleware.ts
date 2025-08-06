import { Injectable, NestMiddleware } from "@nestjs/common";
import { ICustomRequest } from "src/modules/auth/auth.interfaces";
import { Response } from "express";
import { parseUserAgent } from '../utils/user-agent.util';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: ICustomRequest, res: Response, next: () => void) {
    const ip =
      req.headers["x-forwarded-for"]?.toString() ||
      (req as any).socket?.remoteAddress ||
      "";
    const userAgent = req.headers["user-agent"] || "";
    const { device, os, browser } = parseUserAgent(userAgent);
    req.userData = { ip, userAgent, device, os, browser };
    next();
  }
}
