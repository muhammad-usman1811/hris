import { createLogger, transports, format } from "winston";
import dotenv from "dotenv";
import "winston-mongodb";

dotenv.config();

const logger = createLogger({
  transports: [
    new transports.MongoDB({
      level: "info",
      db: process.env.MONGO_URI_LOCAL,
      options: { useUnifiedTopology: true },
      collection: "logs",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json()
      ),
    }),
  ],
});

export default logger;
