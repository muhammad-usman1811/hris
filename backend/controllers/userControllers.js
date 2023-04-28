import User from "./../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "./../utils/generateToken.js";
import uploadPhoto from "../config/imageUpload.js";
import multer from "multer";
import fs from "fs";
import LeaveQuota from "../models/leaveQuotaModel.js";

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
      role: user.role,
      title: user.jobDetails.title,
      department: user.jobDetails.department,
      supervisor: user.jobDetails.supervisor,
      leaveQuota: user.leaveQuota,
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
      contact,
      date,
      department,
      designation,
      email,
      emergencyAddress,
      emergencyName,
      employeeId,
      name,
      passport,
      password,
      phone,
      relation,
      role,
      supervisor,
      title,
      workType,
    } = req.body;

    //Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      return res.json({ message: "Email already exists" });
    }

    //Calculate leave quota based on date of joining
    const leaveQuota = calculateLeaveQuota(date);

    // Creating new document
    const user = new User({
      imageUrl: file.path,
      name,
      email,
      password,
      role,
      phone,
      address,
      cnic,
      passport,
      leaveQuota,
      jobDetails: {
        title,
        designation,
        department,
        employeeId,
        supervisor,
        dateOfJoining: date,
        workType,
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
      address,
      blood,
      cnic,
      contact,
      date,
      department,
      designation,
      email,
      emergencyAddress,
      emergencyName,
      employeeId,
      name,
      passport,
      password,
      phone,
      relation,
      role,
      supervisor,
      title,
      workType,
    } = req.body;

    const updatedData = {
      imageUrl: file.path,
      name,
      email,
      password,
      role,
      phone,
      address,
      cnic,
      passport,
      jobDetails: {
        title,
        designation,
        department,
        employeeId,
        supervisor,
        dateOfJoining: date,
        workType,
      },
      emergencyDetails: {
        name: emergencyName,
        contact,
        relation,
        address: emergencyAddress,
        blood,
      },
    };

    const user = await User.findById(id);
    if (user) {
      const filePath = user.imageUrl;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
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
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, getUsers, getUserById, addUser, editUser, deleteUser };
