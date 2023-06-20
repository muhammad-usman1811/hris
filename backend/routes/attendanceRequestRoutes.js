import express from "express";
import {
  addAttendanceRequest,
  getAttendanceRequestsOfUser,
  getTeamAttendanceRequests,
  getTeamAttendanceRequestsForEM,
  updateEMApproval,
  updateStatusBySupervisor,
  updateSupervisorApproval,
} from "../controllers/attendanceRequestControllers.js";
import protect from "./../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/:id").get(getAttendanceRequestsOfUser);
router.route("/add").post(protect, addAttendanceRequest);
router.route("/team/:supervisor").get(protect, getTeamAttendanceRequests);
router
  .route("/team/EM/:engagementManager")
  .get(protect, getTeamAttendanceRequestsForEM);
router.route("/approve/:id").put(protect, updateSupervisorApproval);
router.route("/approve/EM/:id").put(protect, updateEMApproval);
router.route("/cancel/:id").put(protect, updateStatusBySupervisor);

export default router;
