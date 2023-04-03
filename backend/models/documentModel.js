import mongoose from "mongoose";

const documentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: () => new Date().toLocaleDateString("en-US"),
    },
  },
  { timeStamps: true }
);

const Document = mongoose.model("Document", documentSchema);
export default Document;
