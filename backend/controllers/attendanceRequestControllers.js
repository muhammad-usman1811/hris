import User from "../models/userModel.js";
import AttendanceRequest from "./../models/attendanceRequestModel.js";
import asyncHandler from "express-async-handler";
import Attendance from "./../models/attendanceModel.js";

const updateEMApproval = asyncHandler(async (req, res) => {
  const request = await AttendanceRequest.findById(req.params.id);

  //Update supervisor approval
  if (request) {
    request.lineManagerApproval = true;
    request.status = "Approved";
    await request.save();

    //Fetch user details required for attendance document
    const user = await User.findById(request.userId);
    //Format shift start and end time
    const startTime = new Date();
    const [startHour, startMinute] = user.shiftStartTime.split(":");
    startTime.setHours(startHour, startMinute);
    const formattedStartTime = startTime.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const endTime = new Date();
    const [endHour, endMinute] = user.shiftEndTime.split(":");
    endTime.setHours(endHour, endMinute);
    const formattedEndTime = endTime.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    //Convert date string to object
    const createdAt = new Date(request.date);
    //Create an attendance document
    const attendance = new Attendance({
      userId: request.userId,
      name: request.name,
      department: request.department,
      email: user.email,
      checkIn: formattedStartTime,
      checkOut: formattedEndTime,
      createdAt: createdAt,
    });

    await attendance.save();
    res.json({ message: "Request approved by EM" });
  } else {
    res.status(404);
    throw new Error("Request not found");
  }
});

const updateSupervisorApproval = asyncHandler(async (req, res) => {
  const request = await AttendanceRequest.findById(req.params.id);

  //Update supervisor approval
  if (request) {
    request.supervisorApproval = true;
    if (request.supervisor === request.engagementManager) {
      request.lineManagerApproval = true;
      request.status = "Approved";
    }
    await request.save();
    res.json({ message: "Request approved by supervisor" });
  } else {
    res.status(404);
    throw new Error("Request not found");
  }
});

const updateStatusBySupervisor = asyncHandler(async (req, res) => {
  const request = await AttendanceRequest.findById(req.params.id);
  const user = await User.findById(request.userId);
  if (request) {
    request.status = "Cancelled";
    await request.save();

    //Send email to employee
    const html = `
<p>Hi <span style="font-weight:bold;">${user.name}</span>,</p> <p> <br> This is to inform you that your attendance request for date ${request.date}  has been rejected by your Line Manager.</p>
<p style="font-weight: bold;">Best regards,</p>
<p style="font-weight: bold;">HRIS</p>
<p style="font-weight: bold;"><span style="color:red">Digi</span>float (Private) Ltd.</p>`;

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
      from: "No-Reply<hrisdigifloat@gmail.com>",

      to: user.email,

      subject: "Leave Request Cancelled",

      html: html,
    });

    res.json({ message: "Request cancelled by Supervisor" });
  } else {
    res.status(404);
    throw new Error("Attendance request not found");
  }
});

const getTeamAttendanceRequests = asyncHandler(async (req, res) => {
  const attendanceRequests = await AttendanceRequest.find({
    supervisor: req.params.supervisor,
  });
  res.json(attendanceRequests);
});

const getTeamAttendanceRequestsForEM = asyncHandler(async (req, res) => {
  const attendanceRequests = await AttendanceRequest.find({
    engagementManager: req.params.engagementManager,
    status: "Pending",
  });
  res.json(attendanceRequests);
});

// @desc Get leaves list
// @route GET/api/attendanceRequest
// @access Private/User
const getAttendanceRequestsOfUser = asyncHandler(async (req, res) => {
  const attendanceRequests = await AttendanceRequest.find({
    userId: req.params.id,
  });
  res.json(attendanceRequests);
});

const addAttendanceRequest = asyncHandler(async (req, res) => {
  const { date, reason } = req.body;
  const supervisor = await User.findOne({
    name: req.user.jobDetails.supervisor,
  })
    .select("email")
    .lean();

  const supervisorEmail = supervisor.email;
  const attendanceRequest = new AttendanceRequest({
    userId: req.user._id,
    name: req.user.name,
    department: req.user.jobDetails.department,
    supervisor: req.user.jobDetails.supervisor,
    engagementManager: req.user.jobDetails.engagementManager,
    date,
    reason,
  });
  await attendanceRequest.save();
  const html = `
<p>Hi <span style="font-weight: bold;">${req.user.jobDetails.supervisor}</span>, <br> <span style="font-weight: bold;">${req.user.name}</span> has submitted a manual attendance request. The details of the request are as follows:</p>
<ul>
<li>Date: ${date}</li>
<li>Reason: ${reason}</li>
</ul>
<p>Please respond to this email as soon as possible.</p>
<p>Thank you,</p>
<p>${req.user.name}</p>
`;

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
    from: "No-Reply<hrisdigifloat@gmail.com>",

    to: supervisorEmail,

    subject: "Manual Attendance Request",

    html: html,
  });

  res.status(201).json({ message: "Attendance request sent" });
});

export {
  addAttendanceRequest,
  getAttendanceRequestsOfUser,
  getTeamAttendanceRequests,
  getTeamAttendanceRequestsForEM,
  updateSupervisorApproval,
  updateEMApproval,
  updateStatusBySupervisor,
};
