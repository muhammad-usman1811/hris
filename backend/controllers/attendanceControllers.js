import User from "../models/userModel.js";
import Attendance from "./../models/attendanceModel.js";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import moment from "moment";

// @desc Get attendance list
// @route GET/api/attendance
// @access private/admin

const getAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.find({});
  res.json(attendance);
});

// @desc Get attendance for current day for a user
// @route GET/api/attendance/:id
// @access private/employee

const getAttendanceOfUser = asyncHandler(async (req, res) => {
  const today = moment().startOf("day");
  const query = {
    $and: [
      { userId: req.params.id },
      {
        createdAt: {
          $gte: today.toDate(),
          $lt: moment(today).endOf("day").toDate(),
        },
      },
    ],
  };

  try {
    const attendance = await Attendance.findOne(query);
    if (attendance) {
      res.json(attendance);
    } else {
      res
        .status(404)
        .json({ message: "No attendance record found for the user and date" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Add check-in time to attendance collection along with other fields
// @route POST/api/attendance/checkIn
// @access public/employee

const addCheckIn = asyncHandler(async (req, res) => {
  const { checkIn } = req.body;

  const newAttendance = new Attendance({
    userId: req.user._id,
    name: req.user.name,
    email: req.user.email,
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

const sendEmailForCheckIn = async (req, res) => {
  try {
    const currentDate = moment().startOf("day"); // Get the current date

    const usersMissingAttendance = await User.aggregate([
      {
        $lookup: {
          from: "attendances", // Name of the attendance collection
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", "$$userId"] }, // Match the userId field
                    { $gte: ["$createdAt", currentDate] }, // Match the current date
                  ],
                },
              },
            },
          ],
          as: "attendance",
        },
      },
      {
        $match: {
          attendance: { $size: 0 }, // Filter users without attendance entries
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
        },
      },
    ]);

    if (usersMissingAttendance.length > 0) {
      //Create email configuration
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",

        port: 465,

        secure: true,

        auth: {
          user: "hrisdigifloat@gmail.com",
          pass: "qjvuxxgqkhakreax",
        },
      });

      for (const user of usersMissingAttendance) {
        // Access the properties of each user
        const name = user.name;
        const email = user.email;

        // Prepare and send the email to the user
        const html = `
    <p style="font-weight: bold;">Dear ${name},</p>
    <p>This is a reminder to mark your attendance for today. If you are currently on leave, kindly disregard this email.</p>
    <p style="font-weight: bold;">Best Regards,</p>
    <p style="color:black;margin-top: -10px;"><span style="color:red">Digi</span>float's HRIS</p>
    <footer style="font-weight: bold;font-style: italic;color: red;">This is an auto-generated message. Please do not reply to it.</footer>
  `;

        await transporter.sendMail({
          from: "HRIS <hrisdigifloat@gmail.com>",

          to: email,

          subject: "Reminder - Check In",

          html: html,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const sendEmailForCheckOut = asyncHandler(async (req, res) => {
  try {
    const currentDate = moment().startOf("day"); // Get the current date

    const employeesMissingCheckOut = await Attendance.find({
      checkOut: { $exists: false }, // Filter documents where checkOut field doesn't exist
      createdAt: { $gte: currentDate }, // Filter documents created on the current date
    });

    if (employeesMissingCheckOut.length > 0) {
      //Create email configuration
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",

        port: 465,

        secure: true,

        auth: {
          user: "hrisdigifloat@gmail.com",
          pass: "qjvuxxgqkhakreax",
        },
      });
      for (const user of employeesMissingCheckOut) {
        // Access the properties of each user
        const name = user.name;
        const email = user.email;

        // Prepare and send the email to the user
        const html = `
    <p style="font-weight: bold;">Dear ${name},</p>
    <p>This is a reminder to check out for today. If you are currently on leave, kindly disregard this email.</p>
    <p style="font-weight: bold;">Best Regards,</p>
    <p style="color:black;margin-top: -10px;"><span style="color:red">Digi</span>float's HRIS</p>
    <footer style="font-weight: bold;font-style: italic;color: red;">This is an auto-generated message. Please do not reply to it.</footer>
  `;

        await transporter.sendMail({
          from: "HRIS <hrisdigifloat@gmail.com>",

          to: email,

          subject: "Reminder - Check Out",

          html: html,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

export {
  getAttendance,
  addCheckIn,
  addCheckOut,
  sendEmailForCheckIn,
  sendEmailForCheckOut,
  getAttendanceOfUser,
};
