import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getLeaves } from "../controllers/leaveControllers.js";

const router = express.Router();

router.route("/").get(protect, getLeaves);

export default router;
