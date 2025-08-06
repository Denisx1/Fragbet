import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as requestIp from 'request-ip';  // Если используешь request-ip
import { ICustomRequest } from 'src/modules/auth/auth.interfaces';

@Injectable()
export class GetIpMiddleware implements NestMiddleware {
  use(req: ICustomRequest, res: Response, next: NextFunction) {
    // Получаем IP с помощью request-ip или другого метода
    const ip = requestIp.getClientIp(req);
    console.log('IP Address: ', ip);

    // Добавляем IP в кастомное свойство req.userIp
    req.userIp = ip;
    next();
  }
}