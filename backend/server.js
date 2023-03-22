import express from "express";
import dotenv from "dotenv";
import "colors";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

connectDb();

const app = express();

//Middleware to parse the json from request body
app.use(express.json());

//Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

//Middlewares to use routes
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server is running on port ${PORT}`.yellow.bold));
