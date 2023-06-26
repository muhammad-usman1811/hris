import User from "./../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "./../utils/generateToken.js";
import uploadPhoto from "../config/imageUpload.js";
import multer from "multer";
import fs from "fs";
import LeaveQuota from "../models/leaveQuotaModel.js";
import Attendance from "../models/attendanceModel.js";
import Leave from "../models/leaveModel.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

//Function to calcualate leave quota
const calculateLeaveQuota = async (dateOfJoining) => {
  const joiningDate = new Date(dateOfJoining);

  const currentYear = new Date().getFullYear();
  const endOfYear = new Date(currentYear, 11, 31);
  const daysInYear = Math.ceil(
    (endOfYear - joiningDate) / (1000 * 60 * 60 * 24)
  );

  const leaveQuotas = await LeaveQuota.find({});

  return leaveQuotas.reduce((acc, quota) => {
    const adjustedQuota = {
      leaveType: quota.leaveType,
      leaveCount: Math.ceil((quota.leaveCount / 365) * daysInYear),
    };
    acc.push(adjustedQuota);
    return acc;
  }, []);
};

// @desc Authenticate user and get token
// @route POST/api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && user.password === password) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
      role: user.role,
      title: user.jobDetails.title,
      department: user.jobDetails.department,
      supervisor: user.jobDetails.supervisor,
      leaveQuota: user.leaveQuota,
      gender: user.gender,
      passwordChangeRequired: user.passwordChangeRequired,
      token: generateToken(user._id),
    });
  } else {
    if (user && user.password !== password) {
      throw new Error("Password is invalid");
    } else {
      throw new Error("Email is invalid");
    }
  }
});

//Description: Get the user details based on email in case of forgot password
//Route: GET/api/users/forgot/:email
//Access: Public

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email doesn't exist");
  } else {
    // Generate a secure random token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Set the reset token and its expiration time in the user model
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000; //Set the token to expire in hour

    await user.save();
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

    // Prepare the email content
    const emailContent = {
      from: "HRIS <hrisdigifloat@gmail.com>",
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Dear ${user.name},</p><p>Click the following link to reset your password: <a href="http://10.51.100.66:3000/reset-password?token=${resetToken}">Reset Password</a></p><p>If you didn't request this password reset, please ignore this email.</p>`,
    };

    // Send the reset email
    transporter.sendMail(emailContent, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Reset email sent: " + info.response);
      }
    });
    res.json({ message: "Email sent successfully" });
  }
});

//Description: Reset password
//Route: POST/api/users/reset-password
//Access: Private
const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  try {
    const user = await User.findOne({ resetToken: token });
    if (user) {
      user.password = password;
      await user.save();
    }
    res.json({ message: "Password Updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//Description: Change password
//Route: POST/api/users/change-password
//Access: Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user) {
      if (user.password !== currentPassword) {
        res.json({ message: "Current password is incorrect" });
      } else {
        user.password = newPassword;
        user.passwordChangeRequired = false;
        await user.save();
        res.json({ message: "Password Updated" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Get all users
// @route GET/api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc Get user by Id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Description: Add a new user
// Route: POST /api/users
// Access: Private/Admin
const addUser = asyncHandler(async (req, res) => {
  // Using multer to upload profile photo
  uploadPhoto(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // Multer error occurred while uploading
      return res.status(500).json({ message: "Error uploading file" });
    } else if (err) {
      // Unknown error
      return res.status(500).json({ message: "Error uploading file" });
    }
    const file = req.file;
    const {
      address,
      blood,
      cnic,
      dob,
      maritalStatus,
      contact,
      date,
      department,
      gender,
      shiftStartTime,
      shiftEndTime,
      designation,
      reportingOffice,
      reportingDepartment,
      engagementManager,
      permanentDate,
      client,
      projectName,
      projectRole,
      projectType,
      billableHours,
      region,
      projectStartDate,
      projectEndDate,
      degree,
      degreeStartDate,
      degreeEndDate,
      institute,
      email,
      personalEmail,
      emergencyAddress,
      emergencyName,
      employeeId,
      name,
      passport,
      password,
      phone,
      relation,
      role,
      employmentStatus,
      salary,
      supervisor,
      title,
      workType,
      fuel,
      medicalAllowance,
      providentFund,
      empOfQuarter,
      paidCertifications,
      paidTimeOff,
      annualBonus,
    } = req.body;

    //Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      return res.json({ message: "Email already exists" });
    }

    const employeeIdExists = await User.findOne({ employeeId });
    if (employeeIdExists) {
      res.status(400);
      return res.json({ message: "Employee Id already exists" });
    }

    const cnicExists = await User.findOne({ cnic });
    if (cnicExists) {
      res.status(400);
      return res.json({ message: "CNIC already exists" });
    }

    //Calculate leave quota based on date of joining
    //const leaveQuota = calculateLeaveQuota(date);
    const leaveQuota = [
      { leaveType: "Earned", leaveCount: 12 },
      { leaveType: "Casual", leaveCount: 4 },
      { leaveType: "Sick", leaveCount: 4 },
      { leaveType: "Maternity", leaveCount: 90 },
      { leaveType: "Paternity", leaveCount: 3 },
      { leaveType: "Special Sick", leaveCount: 30 },
      { leaveType: "Bereavement", leaveCount: 2 },
    ];

    // Creating new document
    const user = new User({
      imageUrl: file.filename,
      name,
      email,
      personalEmail,
      employeeId,
      password,
      role: JSON.parse(role),
      phone,
      address,
      cnic,
      passport,
      dob,
      gender,
      shiftStartTime,
      shiftEndTime,
      maritalStatus,
      leaveQuota,
      projectDetails: {
        client,
        projectName,
        projectRole,
        projectType,
        billableHours,
        region,
        startDate: projectStartDate,
        endDate: projectEndDate,
      },
      educationalInfo: {
        degree,
        startDate: degreeStartDate,
        endDate: degreeEndDate,
        institute,
      },
      fuel,
      medicalAllowance,
      providentFund,
      empOfQuarter,
      paidCertifications,
      paidTimeOff,
      annualBonus,
      jobDetails: {
        title,
        designation,
        department,
        supervisor,
        dateOfJoining: date,
        workType,
        employmentStatus,
        salary,
        engagementManager,
        permanentDate,
        reportingOffice,
        reportingDepartment,
      },
      emergencyDetails: {
        name: emergencyName,
        contact,
        relation,
        address: emergencyAddress,
        blood,
      },
    });

    //Saving in database
    try {
      await user.save();
      return res.status(200).json({ message: "User added successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Invalid user data" });
    }
  });
});

// Description: Edit user
// Rotue: PUT /api/users/:id
// Access: Private/Admin
const editUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  uploadPhoto(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // Multer error occurred while uploading
      return res.status(500).json({ message: "Error uploading file" });
    } else if (err) {
      // Unknown error
      console.log(err);
      return res.status(500).json({ message: "Error uploading file" });
    }

    const file = req.file;

    const {
      imageUrl,
      address,
      blood,
      cnic,
      dob,
      maritalStatus,
      contact,
      date,
      department,
      gender,
      shiftStartTime,
      shiftEndTime,
      designation,
      reportingOffice,
      reportingDepartment,
      engagementManager,
      permanentDate,
      client,
      projectName,
      projectRole,
      projectType,
      billableHours,
      region,
      projectStartDate,
      projectEndDate,
      degree,
      degreeStartDate,
      degreeEndDate,
      institute,
      email,
      personalEmail,
      emergencyAddress,
      emergencyName,
      employeeId,
      name,
      passport,
      password,
      phone,
      relation,
      role,
      employmentStatus,
      salary,
      supervisor,
      title,
      workType,
      fuel,
      medicalAllowance,
      providentFund,
      empOfQuarter,
      paidCertifications,
      paidTimeOff,
      annualBonus,
    } = req.body;

    const updatedData = {
      imageUrl: file ? file.filename : imageUrl,
      name,
      email,
      personalEmail,
      employeeId,
      password,
      role: JSON.parse(role),
      phone,
      address,
      cnic,
      dob,
      maritalStatus,
      gender,
      shiftStartTime,
      shiftEndTime,
      passport,
      projectDetails: {
        client,
        projectName,
        projectRole,
        projectType,
        billableHours,
        region,
        startDate: projectStartDate,
        endDate: projectEndDate,
      },
      educationalInfo: {
        degree,
        startDate: degreeStartDate,
        endDate: degreeEndDate,
        institute,
      },
      fuel,
      medicalAllowance,
      providentFund,
      empOfQuarter,
      paidCertifications,
      paidTimeOff,
      annualBonus,
      jobDetails: {
        title,
        designation,
        department,
        supervisor,
        dateOfJoining: date,
        workType,
        employmentStatus,
        salary,
        engagementManager,
        permanentDate,
        reportingOffice,
        reportingDepartment,
      },
      emergencyDetails: {
        name: emergencyName,
        contact,
        relation,
        address: emergencyAddress,
        blood,
      },
    };

    // const user = await User.findById(id);
    // if (user) {
    //   const filePath = `/profilePhotos/${user.imageUrl}`;
    //   fs.unlink(filePath, (err) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //   });
    // }
    const result = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (result) {
      res.json({ message: "User updated successfully" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });
});

// Description: Delete a user
// Route: DELETE /api/users/:id
// Access: Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const filePath = user.imageUrl;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
    await user.remove();
    await Attendance.deleteMany({ userId: req.params.id });
    await Leave.deleteMany({ userId: req.params.id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  getUsers,
  getUserById,
  addUser,
  editUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  changePassword,
};
