import mongoose from "mongoose";

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
    passport: {
      type: String,
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
        required: true,
      },
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
