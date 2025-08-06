import { Injectable } from "@nestjs/common";
import WebSocket from "ws";

@Injectable()
export class GridWsService {
  private ws: WebSocket;

  connect() {
    const url = `wss://api.grid.gg/live-data-feed/series/1?key=${process.env.GRID_API_KEY}`;
    this.ws = new WebSocket(url);

    this.ws.on("open", () => {
      console.log("WebSocket подключен");
    });

    this.ws.on("message", (data) => {
      console.log(`Получено сообщение: ${data}`);
      // Здесь потом будет обработка данных
    });

    this.ws.on("close", () => {
      console.log("WebSocket закрыто");
    });

    this.ws.on("error", (error) => {
      console.error("Ошибка WebSocket:", error);
    });
  }
}
