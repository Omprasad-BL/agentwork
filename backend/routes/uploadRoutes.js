import express from "express";
import multer from "multer";
import { uploadAndDistribute } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Configure storage (Multer handles uploads)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder must exist or be created at project root
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV, XLS, or XLSX files are allowed."));
    }
  },
});

// Route: POST /api/upload => Upload and distribute CSV
router.post("/", protect, upload.single("file"), uploadAndDistribute);

// (Optional) Route to get distributed lists for display
import DistributedList from "../models/DistributedList.js";
router.get("/distributed", protect, async (req, res) => {
  try {
    const lists = await DistributedList.find().populate("agentId", "name email");
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
