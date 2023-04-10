import express from "express";
import {
  addUser,
  authUser,
  editUser,
  getUserById,
  getUsers,
} from "../controllers/userControllers.js";
import protect from "../middlewares/authMiddleware.js";
import uploadPhoto from "../config/imageUpload.js";

const router = express.Router();

router.route("/").post(addUser).get(protect, getUsers);
router
  .route("/:id")
  .put(protect, uploadPhoto, editUser)
  .get(protect, getUserById);
router.post("/login", authUser);

export default router;
