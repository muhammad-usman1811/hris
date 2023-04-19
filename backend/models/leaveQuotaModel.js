import mongoose from "mongoose";

const leaveQuotaSchema = mongoose.Schema({
  leaveType: {
    type: String,
    required: true,
  },
  leaveCount: {
    type: Number,
    required: true,
  },
});

const LeaveQuota = mongoose.model("LeaveQuota", leaveQuotaSchema);
export default LeaveQuota;
