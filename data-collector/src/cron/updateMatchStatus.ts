import cron from "node-cron";
import { main } from "../index";
import {
  connectToDataBase,
  disconnectFromDataBase,
} from "../models/connectToDb/connectTodb";
import { updateMatches } from "../services/matchUpdateService";

export async function startCronJobs(): Promise<void> {
  await connectToDataBase();
  cron.schedule("0   6 * * *", async () => {
    // каждые 5 минут
    console.log("Running main function via cron...");
    try {
      await main(); // Вызываем функцию main()
    } catch (error) {
      console.error("Error in main function from cron:", error);
    }
  });
  cron.schedule("*/2 * * * *", async () => {
    console.log("Running Update Match Status function via cron...");
    try {
      await updateMatches();
    } catch (error) {
      console.error(
        "Error in update status matches function from cron:",
        error
      );
    }
  });
  process.on("SIGINT", async () => {
    console.log("Disconnecting database...");
    await disconnectFromDataBase();
    process.exit(0);
  });
}
