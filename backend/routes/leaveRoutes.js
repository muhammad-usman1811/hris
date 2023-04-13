import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  addLeaveRequest,
  getLeaves,
  getTeamLeaves,
  getUserLeaves,
  updateLeaveToApprove,
  updateLeaveToCancel,
} from "../controllers/leaveControllers.js";

const router = express.Router();

router.route("/").get(protect, getLeaves);
router.route("/request").post(protect, addLeaveRequest);
router.route("/:id").get(protect, getUserLeaves);
router.route("/approve/:id").put(protect, updateLeaveToApprove);
router.route("/cancel/:id").put(protect, updateLeaveToCancel);
router.route("/team/:supervisor").get(protect, getTeamLeaves);

export default router;
