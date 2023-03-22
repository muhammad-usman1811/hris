import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getAttendance } from "./../controllers/attendanceControllers.js";

const router = express.Router();

router.route("/").get(protect, getAttendance);

export default router;
