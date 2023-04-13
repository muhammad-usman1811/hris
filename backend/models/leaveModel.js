import mongoose from "mongoose";

const leaveSchema = mongoose.Schema(
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
    type: {
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
    reason: {
      type: String,
      required: true,
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

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
