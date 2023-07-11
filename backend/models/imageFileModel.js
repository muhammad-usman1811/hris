import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  length: Number,
  uploadDate: Date,
  fileId: mongoose.Schema.Types.ObjectId,
});

const File = mongoose.model("File", fileSchema);

export default File;
