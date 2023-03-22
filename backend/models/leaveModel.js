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
    type: {
      type: String,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
