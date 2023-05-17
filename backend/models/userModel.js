import mongoose from "mongoose";
import LeaveQuota from "./leaveQuotaModel.js";

const userSchema = mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    passport: {
      type: String,
    },
    leaveQuota: {
      type: [LeaveQuota.schema],
      default: [],
    },
    jobDetails: {
      title: {
        type: String,
        required: true,
      },
      designation: {
        type: String,
        required: true,
      },
      department: {
        type: String,
        required: true,
      },
      employeeId: {
        type: String,
        required: true,
      },
      supervisor: {
        type: String,
        required: true,
      },
      dateOfJoining: {
        type: String,
        required: true,
      },
      workType: {
        type: String,
        required: true,
      },
      employmentStatus: {
        type: String,
      },
      salary: {
        type: String,
        required: true,
      },
    },
    emergencyDetails: {
      name: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
        required: true,
      },
      relation: {
        type: String,
        required: true,
      },
      address: {
        type: String,
      },
      blood: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
