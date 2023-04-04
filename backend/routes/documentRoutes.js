import express from "express";
import {
  getDocuments,
  uploadDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/documentController.js";
import protect from "./../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getDocuments);
router.post("/upload", uploadDocument);
router.route("/:id").put(updateDocument);
router.route("/:id").delete(deleteDocument);

export default router;
