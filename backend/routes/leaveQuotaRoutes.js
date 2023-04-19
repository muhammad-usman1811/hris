import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  getQuotas,
  updateQuotas,
} from "./../controllers/leaveQuotaController.js";

const router = express.Router();

router.route("/").get(getQuotas).put(updateQuotas);

export default router;
