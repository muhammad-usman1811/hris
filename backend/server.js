import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import "colors";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

connectDb();

const app = express();

//Middleware to parse the json from request body
app.use(express.json());

//Define directory to store uploaded docs
const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "/uploads");

//Create directory
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

//Middlewares to use routes
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/documents", documentRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server is running on port ${PORT}`.yellow.bold));
