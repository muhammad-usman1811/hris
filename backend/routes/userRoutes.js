import express from "express";
import {
  addUser,
  authUser,
  changePassword,
  deleteUser,
  editUser,
  forgotPassword,
  getUserById,
  getUsers,
  resetPassword,
} from "../controllers/userControllers.js";
import protect from "../middlewares/authMiddleware.js";
import uploadPhoto from "../config/imageUpload.js";

const router = express.Router();

router.route("/").post(addUser).get(protect, getUsers);
router
  .route("/:id")
  .put(protect, editUser)
  .get(protect, getUserById)
  .delete(protect, deleteUser);
router.post("/login", authUser);
router.route("/forgot").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/change-password").post(changePassword);

export default router;
