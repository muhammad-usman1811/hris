import express from "express";
import {
  addUser,
  authUser,
  deleteUser,
  editUser,
  forgotPassword,
  getUserById,
  getUsers,
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
router.route("/forgot/:email").get(forgotPassword);

export default router;
