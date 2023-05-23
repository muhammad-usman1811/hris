import User from "../models/userModel.js";
import Leave from "./../models/leaveModel.js";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

const calculateDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  return daysDiff;
};

// @desc Get leaves list
// @route GET/api/leaves
// @access Private/Admin
const getLeaves = asyncHandler(async (req, res) => {
  const leaves = await Leave.find({});
  res.json(leaves);
});

const addLeaveRequest = asyncHandler(async (req, res) => {
  const { type, startDate, endDate, reason } = req.body;
  const supervisor = await User.findOne({
    name: req.user.jobDetails.supervisor,
  })
    .select("email")
    .lean();

  const supervisorEmail = supervisor.email;
  const leaveRequest = new Leave({
    userId: req.user._id,
    name: req.user.name,
    department: req.user.jobDetails.department,
    supervisor: req.user.jobDetails.supervisor,
    type,
    startDate,
    endDate,
    reason,
  });
  await leaveRequest.save();
  const html = `
<p>Hi ${req.user.jobDetails.supervisor}, <br> ${req.user.name} has submitted a leave request. The details of the leave request are as follows:</p>
<ul>
<li>Leave type: ${type}</li>
<li>Start date: ${startDate}</li>
<li>End date: ${endDate}</li>
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
    from: "HRIS <hrisdigifloat@gmail.com>",

    to: supervisorEmail,

    subject: "Leave Request",

    html: html,
  });

  res.status(201).json({ message: "Leave request sent" });
});

const getUserLeaves = asyncHandler(async (req, res) => {
  const leaves = await Leave.find({ userId: req.params.id });
  res.json(leaves);
});

const getTeamLeaves = asyncHandler(async (req, res) => {
  const leaves = await Leave.find({
    supervisor: req.params.supervisor,
  });
  res.json(leaves);
});

const updateLeaveToApprove = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id);
  const user = await User.findById(leave.userId);
  const leaveType = leave.type.split(" ")[0];

  if (leave) {
    leave.status = "Approved";
    await leave.save();

    //Send email to Employee
    const html = `
<p>Hi ${user.name}, <br> This is to inform you that your leave request for ${leave.startDate} to ${leave.endDate} has been approved and we hope
it allows you to achieve the work-life balance you deserve.</p>
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

      subject: "Leave Request Approved",

      html: html,
    });

    //Update user's leaveQuota
    if (user) {
      const updatedLeaveQuota = user.leaveQuota.map((quota) => {
        if (quota.leaveType === leaveType) {
          quota.leaveCount -= calculateDays(leave.startDate, leave.endDate);
        }
        return quota;
      });
      user.leaveQuota = updatedLeaveQuota;
      await user.save();
    }
    res.json({ message: "Leave approved" });
  } else {
    res.status(404);
    throw new Error("Leave not found");
  }
});

const updateLeaveToCancel = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id);
  const user = await User.findById(leave.userId);
  if (leave) {
    leave.status = "Cancelled";
    await leave.save();

    //Send email to employee
    const html = `
<p>Hi ${user.name}, <br> This is to inform you that your leave request for ${leave.startDate} to ${leave.endDate} has been rejected.</p>
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

      subject: "Leave Request Cancelled",

      html: html,
    });

    res.json({ message: "Leave cancelled" });
  } else {
    res.status(404);
    throw new Error("Leave not found");
  }
});

export {
  getLeaves,
  addLeaveRequest,
  getUserLeaves,
  getTeamLeaves,
  updateLeaveToApprove,
  updateLeaveToCancel,
};
