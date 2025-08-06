import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers["content-type"] === "application/json" &&
      req.originalUrl === "/stripe/webhook"
    ) {
      const chunks: Buffer[] = []; // Массив для хранения чанков данных

      req.on("data", (chunk: Buffer) => {
        chunks.push(chunk); // Добавляем чанк в массив
      });

      req.on("end", () => {
        const rawBody = Buffer.concat(chunks); // Объединяем все чанки в один буфер
        (req as any).rawBody = rawBody; // Добавляем rawBody в req
        console.log("RawBody сохранен как Buffer:", rawBody.toString()); // Лог для отладки
        next();
      });

      req.on("error", (err) => {
        console.error("Ошибка чтения сырого тела:", err); // Логируем ошибку
        res.status(500).send("Ошибка обработки вебхука");
      });
    } else {
      next(); // Если не вебхук, просто продолжаем
    }
  }
}
