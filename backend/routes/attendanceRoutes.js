import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  addCheckIn,
  addCheckOut,
  getAttendance,
  sendEmailForCheckIn,
  sendEmailForCheckOut,
} from "./../controllers/attendanceControllers.js";

const router = express.Router();

router.route("/").get(protect, getAttendance);
router.route("/checkIn").post(protect, addCheckIn);
router.route("/checkOut/:id").put(protect, addCheckOut);
router.route("/sendEmail/checkIn/:id").get(sendEmailForCheckIn);
router.route("/sendEmail/checkOut/:id").get(sendEmailForCheckOut);

export default router;
