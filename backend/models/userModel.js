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
    personalEmail: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Array,
      required: true,
      default: [],
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
    resetToken: String,
    resetTokenExpires: Date,
    leaveQuota: {
      type: [LeaveQuota.schema],
      default: [],
    },
    gender: {
      type: String,
      required: true,
    },
    shiftStartTime: {
      type: String,
      required: true,
    },
    shiftEndTime: {
      type: String,
      required: true,
    },
    passwordChangeRequired: {
      type: Boolean,
      default: true,
    },
    projects: [
      {
        client: {
          type: String,
          required: true,
        },
        projectName: {
          type: String,
          required: true,
        },
        projectRole: {
          type: String,
          required: true,
        },
        projectType: {
          type: String,
          required: true,
        },
        billableHours: {
          type: String,
          required: true,
        },
        region: {
          type: String,
          required: true,
        },
        startDate: {
          type: String,
          required: true,
        },
        endDate: {
          type: String,
          //required: true,
        },
      },
    ],
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
      engagementManager: {
        type: String,
        required: true,
      },
      reportingOffice: {
        type: String,
        required: true,
      },
      reportingDepartment: {
        type: String,
      },
      permanentDate: {
        type: String,
        required: true,
      },
    },
    educationalInfo: {
      degree: {
        type: String,
        required: true,
      },
      startDate: {
        type: String,
        required: true,
      },
      endDate: {
        type: String,
        required: true,
      },
      institute: {
        type: String,
        required: true,
      },
    },
    fuel: {
      type: String,
      required: true,
    },
    medicalAllowance: {
      type: String,
      required: true,
    },
    empOfQuarter: {
      type: String,
      required: true,
    },
    providentFund: {
      type: String,
      required: true,
    },
    paidCertifications: {
      type: String,
      required: true,
    },
    annualBonus: {
      type: String,
      required: true,
    },
    paidTimeOff: {
      type: String,
      required: true,
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
