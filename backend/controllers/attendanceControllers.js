import Attendance from "./../models/attendanceModel.js";
import asyncHandler from "express-async-handler";

// @desc Get attendance list
// @route GET/api/attendance
// @access private/admin

const getAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.find({});
  res.json(attendance);
});

export { getAttendance };
