import mongoose from "mongoose";

const attendanceRequestSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      ref: "User",
    },
    department: {
      type: String,
      required: true,
      ref: "User",
    },
    supervisor: {
      type: String,
      required: true,
      ref: "User",
    },
    engagementManager: {
      type: String,
      required: true,
      ref: "User",
    },
    date: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    supervisorApproval: {
      type: Boolean,
      default: false,
    },
    lineManagerApproval: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const AttendanceRequest = mongoose.model(
  "AttendanceRequest",
  attendanceRequestSchema
);
export default AttendanceRequest;
