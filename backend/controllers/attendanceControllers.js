import User from "../models/userModel.js";
import Attendance from "./../models/attendanceModel.js";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

// @desc Get attendance list
// @route GET/api/attendance
// @access private/admin

const getAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.find({});
  res.json(attendance);
});

// @desc Add check-in time to attendance collection along with other fields
// @route POST/api/attendance/checkIn
// @access public/employee

const addCheckIn = asyncHandler(async (req, res) => {
  const { checkIn } = req.body;

  const newAttendance = new Attendance({
    userId: req.user._id,
    name: req.user.name,
    department: req.user.jobDetails.department,
    checkIn,
  });
  await newAttendance.save();
  res.status(201).json({ message: "Attendance added" });
});

// @desc Add check-out time to attendance collection
// @route PUT/api/attendance/checkOut
// @access public/employee

const addCheckOut = asyncHandler(async (req, res) => {
  const { checkOut, workHours } = req.body;

  const today = new Date();
  const query = {
    $and: [
      { userId: req.params.id },
      {
        createdAt: {
          $gte: today.setHours(0, 0, 0, 0),
          $lt: today.setHours(23, 59, 59, 999),
        },
      },
    ],
  };
  const attendance = await Attendance.findOne(query);

  if (attendance) {
    attendance.checkOut = checkOut;
    attendance.workHours = workHours;
    await attendance.save();
    res.json({ message: "Checkout time added" });
  } else {
    res.status(404).json({ message: "Attendance not found" });
  }
});

const sendEmailForCheckIn = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  const html = `
<p>Dear Employee, <br> You have forgotten to check-in your day. Please login to your respective HRIS account to mark your attendance</p>
<p>Best Regards</p>
<p>Digifloat's HRIS</p>`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",

    port: 465,

    secure: true,

    auth: {
      user: "hrisdigifloat@gmail.com",
      pass: "qjvuxxgqkhakreax",
    },
  });

  transporter.sendMail({
    from: "HRIS <hrisdigifloat@gmail.com>",

    to: user.email,

    subject: "Forgot to Check In",

    html: html,
  });

  res.status(201).json({ message: "Email sent for missing check-in" });
});

const sendEmailForCheckOut = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  const html = `
<p>Dear Employee, <br> You have forgotten to check-out your day. Please login to your respective HRIS account to mark your attendance.</p>
<p>Best Regards</p>
<p>Digifloat's HRIS</p>`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",

    port: 465,

    secure: true,

    auth: {
      user: "hrisdigifloat@gmail.com",
      pass: "qjvuxxgqkhakreax",
    },
  });

  transporter.sendMail({
    from: "HRIS <hrisdigifloat@gmail.com>",

    to: user.email,

    subject: "Check Out Missing",

    html: html,
  });

  res.status(201).json({ message: "Email sent for missing check-out" });
});

export {
  getAttendance,
  addCheckIn,
  addCheckOut,
  sendEmailForCheckIn,
  sendEmailForCheckOut,
};
