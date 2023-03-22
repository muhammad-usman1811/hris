import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
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
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    contactNum: {
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
    passport: String,
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
      dateOfJoining: {
        type: Date,
        required: true,
        default: () => new Date().toLocaleDateString("en-US"),
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
      relation: String,
      address: String,
      blood: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
