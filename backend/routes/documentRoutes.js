import express from "express";
import {
  getDocuments,
  uploadDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/documentController.js";

const router = express.Router();

router.route("/").get(getDocuments);
router.route("/upload").post(uploadDocument);
router.route("/:id").put(updateDocument);
router.route("/:id").delete(deleteDocument);

export default router;
