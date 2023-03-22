import express from "express";
import {
  authUser,
  getUserById,
  getUsers,
} from "../controllers/userControllers.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getUsers);
router.route("/:id").get(protect, getUserById);
router.post("/login", authUser);

export default router;
