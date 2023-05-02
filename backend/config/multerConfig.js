import multer from "multer";

//Storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now() + ".pdf");
  },
});

//Creating multer upload object
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
}).single("document");

export default upload;
