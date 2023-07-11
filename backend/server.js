import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import "colors";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import leaveQuotaRoutes from "./routes/leaveQuotaRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cron from "node-cron";
import {
  sendEmailForCheckIn,
  sendEmailForCheckOut,
} from "./controllers/attendanceControllers.js";
import attendanceRequestRoutes from "./routes/attendanceRequestRoutes.js";

dotenv.config();

connectDb();

const app = express();

app.use(cors());

//Middleware to parse the json from request body
app.use(express.json());

//Schedule to send reminder email for check in every hour
// cron.schedule("0 * * * *", () => {
//   sendEmailForCheckIn();
// });

//Schedule to send reminder email for missing checkout every hour
cron.schedule("0 * * * *", () => {
  sendEmailForCheckOut();
});

//Define directory to store uploaded docs
const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "/uploads");

//Define directory to store uploaded profile photos
// const __dirname2 = path.resolve();
// const photoDir = path.join(__dirname2, "/profilePhotos");
const photoDir = "C:/profilePhotos";

//Define directory for catch all route
const __dirname3 = path.resolve();

//Create directory for documents
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//Create directory for photos
if (!fs.existsSync(photoDir)) {
  fs.mkdir(photoDir, { recursive: true });
}
//Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Serve uploaded documents
app.use("/documents", express.static(uploadDir));
app.use("/photos", express.static(photoDir));

//Middlewares to use routes
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/leaveQuotas", leaveQuotaRoutes);
app.use("/api/attendanceRequest", attendanceRequestRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server is running on port ${PORT}`.yellow.bold));
