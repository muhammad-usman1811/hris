import multer from "multer";

//Storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:/profilePhotos/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

//Creating multer upload object
const uploadPhoto = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
}).single("photo");

export default uploadPhoto;
