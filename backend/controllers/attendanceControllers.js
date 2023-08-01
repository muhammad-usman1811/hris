import User from "../models/userModel.js";
import Attendance from "./../models/attendanceModel.js";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import moment from "moment";
import logger from "../config/logger.js";

// @desc Get attendance list
// @route GET/api/attendance
// @access private/admin

const getAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.find({}).sort({ createdAt: 1 }).exec();
  res.json(attendance);
});

const getAttendanceForTimesheet = asyncHandler(async (req, res) => {
  const { name, startDate, endDate } = req.body;

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  try {
    const attendanceRecords = await Attendance.find({
      name,
      createdAt: {
        $gte: new Date(formattedStartDate),
        $lte: new Date(formattedEndDate),
      },
    });

    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving attendance records" });
  }
});

const formatDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return `${month}/${day}/${year}`;
};

//Get attendance of a user for a date range
//Route GET/api/attendance/:id
const getAttendanceOfUser = asyncHandler(async (req, res) => {
  const today = moment().startOf("day").toDate();
  const startOfMonth = moment().startOf("month").toDate();

  const query = {
    $and: [
      { userId: req.params.id },
      {
        createdAt: {
          $gte: startOfMonth,
          $lt: today,
        },
      },
    ],
  };

  try {
    const attendanceRecords = await Attendance.find(query);

    //Array of all dates within the current month
    const allDates = [];
    const currentDate = moment(startOfMonth);
    while (currentDate.isSameOrBefore(today)) {
      allDates.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(1, "day");
    }

    //Array of attendance dates
    const attendanceDates = attendanceRecords.map((record) =>
      moment(record.createdAt).format("YYYY-MM-DD")
    );

    //Array of missing dates
    const missingDates = allDates.filter(
      (date) =>
        !attendanceDates.includes(date) &&
        !isWeekend(date) &&
        !isSameDay(date, today)
    );
    res.json(missingDates);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving " });
  }
});

const isWeekend = (date) => {
  const dayOfWeek = moment(date).day();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

const isSameDay = (date1, date2) => {
  return moment(date1).isSame(date2, "day");
};

// @desc Get attendance for current day for a user
// @route GET/api/todayAttendance/:id
// @access private/employee

const getAttendanceOfUserForToday = asyncHandler(async (req, res) => {
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
  logger.info(`${newAttendance.name} has checked in successfully`);
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
    logger.info(`${attendance.name} has checked out successfully`);
  } else {
    res.status(404).json({ message: "Attendance not found" });
  }
});

const sendEmailForCheckIn = async (req, res) => {
  try {
    // Get the current time
    const currentTime = new Date();

    // Calculate the start time for one hour ago
    const startTime = new Date();
    startTime.setHours(startTime.getHours() - 1);

    // Find the users who have a shift start time within the last hour
    const users = await User.find({
      $expr: {
        $lte: [
          {
            $dateFromParts: {
              year: { $year: currentTime },
              month: { $month: currentTime },
              day: { $dayOfMonth: currentTime },
              hour: { $toInt: { $split: ["$shiftStartTime", ":"] }[0] },
              minute: { $toInt: { $split: ["$shiftStartTime", ":"] }[1] },
              second: 0,
              millisecond: 0,
            },
          },
          currentTime,
        ],
      },
    });

    // Iterate over users
    for (const user of users) {
      // Check if attendance exists for current date for this user
      const attendance = await Attendance.findOne({
        userId: user._id,
        createdAt: { $lte: currentTime },
      });

      if (!attendance) {
        // User has missed check-in, send email reminder
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",

          port: 465,

          secure: true,

          auth: {
            user: "hrisdigifloat@gmail.com",
            pass: "qjvuxxgqkhakreax",
          },
        });

        // Prepare and send the email to the user
        const html = `
            <p style="font-weight: bold;">Dear ${user.name},</p>
            <p>This is a reminder to mark your attendance for today. If you are currently on leave, kindly disregard this email.</p>
            <p style="font-weight: bold;">Best Regards,</p>
            <p style="color:black;margin-top: -10px;"><span style="color:red">Digi</span>float's HRIS</p>
            <footer style="font-weight: bold;font-style: italic;color: red;">This is an auto-generated message. Please do not reply to it.</footer>
          `;

        await transporter.sendMail({
          from: "No-Reply<hrisdigifloat@gmail.com>",

          to: user.email,

          subject: "Reminder - Check In",

          html: html,
        });
      }
    }
  } catch (error) {
    console.error("Error sending reminder email for check in:", error);
  }

  //   const usersMissingCheckIn = await User.aggregate([
  //     {
  //       $lookup: {
  //         from: "attendances",
  //         let: { userId: "$_id" },
  //         pipeline: [
  //           {
  //             $match: {
  //               $expr: {
  //                 $and: [
  //                   { $eq: ["$userId", "$$userId"] },
  //                   { $gte: ["$checkIn", thresholdTime] },
  //                   { $lte: ["$checkIn", currentDate] },
  //                 ],
  //               },
  //             },
  //           },
  //         ],
  //         as: "attendance",
  //       },
  //     },
  //     {
  //       $match: {
  //         attendance: { $size: 0 },
  //         shiftStartTime: { $lte: thresholdTime },
  //       },
  //     },
  //     {
  //       $project: {
  //         _id: 1,
  //         name: 1,
  //         email: 1,
  //       },
  //     },
  //   ]);

  //   if (usersMissingCheckIn.length > 0) {
  //     //Create email configuration
  //     const transporter = nodemailer.createTransport({
  //       host: "smtp.gmail.com",

  //       port: 465,

  //       secure: true,

  //       auth: {
  //         user: "hrisdigifloat@gmail.com",
  //         pass: "qjvuxxgqkhakreax",
  //       },
  //     });

  //     for (const user of usersMissingCheckIn) {
  //       // Access the properties of each user
  //       const name = user.name;
  //       const email = user.email;

  //       // Prepare and send the email to the user
  //       const html = `
  //   <p style="font-weight: bold;">Dear ${name},</p>
  //   <p>This is a reminder to mark your attendance for today. If you are currently on leave, kindly disregard this email.</p>
  //   <p style="font-weight: bold;">Best Regards,</p>
  //   <p style="color:black;margin-top: -10px;"><span style="color:red">Digi</span>float's HRIS</p>
  //   <footer style="font-weight: bold;font-style: italic;color: red;">This is an auto-generated message. Please do not reply to it.</footer>
  // `;

  //       await transporter.sendMail({
  //         from: "No-Reply<hrisdigifloat@gmail.com>",

  //         to: email,

  //         subject: "Reminder - Check In",

  //         html: html,
  //       });
  //     }
  //   }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Server Error" });
  // }
};

const sendEmailForCheckOut = asyncHandler(async (req, res) => {
  try {
    const currentDate = new Date();
    const thresholdTime = new Date();
    thresholdTime.setHours(thresholdTime.getHours() + 1);

    const usersMissingCheckOut = await User.aggregate([
      {
        $lookup: {
          from: "attendances",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", "$$userId"] },
                    { $gte: ["$checkOut", currentDate] },
                    { $lte: ["$checkOut", thresholdTime] },
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
          attendance: { $size: 1 }, // User has checked out within the time range
          shiftEndTime: { $lte: thresholdTime }, // Shift end time before the threshold time
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

    if (usersMissingCheckOut.length > 0) {
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
      for (const user of usersMissingCheckOut) {
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
          from: "No-Reply<hrisdigifloat@gmail.com>",

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
  getAttendanceOfUserForToday,
  getAttendanceOfUser,
  getAttendanceForTimesheet,
};
