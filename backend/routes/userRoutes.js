import express from "express";
import {
  addUser,
  authUser,
  getUserById,
  getUsers,
} from "../controllers/userControllers.js";
import protect from "../middlewares/authMiddleware.js";
import uploadPhoto from "../config/imageUpload.js";

const router = express.Router();

router.route("/").get(protect, getUsers);
router.post("/", uploadPhoto, addUser);
router.route("/:id").get(protect, getUserById);
router.post("/login", authUser);

export default router;
