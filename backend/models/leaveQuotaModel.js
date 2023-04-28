import mongoose from "mongoose";

const leaveQuotaSchema = mongoose.Schema({
  leaveType: {
    type: String,
  },
  leaveCount: {
    type: Number,
  },
});

const LeaveQuota = mongoose.model("LeaveQuota", leaveQuotaSchema);
export default LeaveQuota;
