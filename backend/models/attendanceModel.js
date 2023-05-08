import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema(
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
    checkIn: {
      type: String,
    },
    checkOut: {
      type: String,
    },
    // workHours: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
