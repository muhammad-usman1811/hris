import { createLogger, transports, format } from "winston";
import dotenv from "dotenv";
import "winston-mongodb";

dotenv.config();

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    format.json(),
    format.metadata()
  ),
  transports: [
    new transports.MongoDB({
      db: process.env.MONGO_URI_LOCAL,
      options: { useUnifiedTopology: true },
      collection: "logs",
    }),
  ],
});

export default logger;
