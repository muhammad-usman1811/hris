import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  addCheckIn,
  addCheckOut,
  getAttendance,
  getAttendanceOfUser,
} from "./../controllers/attendanceControllers.js";

const router = express.Router();

router.route("/").get(protect, getAttendance);
router.route("/:id").get(getAttendanceOfUser);
router.route("/checkIn").post(protect, addCheckIn);
router.route("/checkOut/:id").put(protect, addCheckOut);

export default router;
