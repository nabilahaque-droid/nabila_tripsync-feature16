const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const Document = require("../models/Document");

const UPLOAD_DIR = path.resolve(__dirname, "../uploads");
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
]);

// Ensure the upload directory exists at runtime
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = crypto.randomBytes(6).toString("hex");
    const safeExt = path.extname(file.originalname) || "";
    cb(null, `${Date.now()}-${uniqueSuffix}${safeExt}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (ALLOWED_TYPES.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and image files are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
}).single("file");

exports.uploadDocument = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      const message = err.message || "Unable to upload file.";
      return res.status(400).json({ message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    try {
      const document = await Document.create({
        user: req.userId,
        originalName: req.file.originalname,
        storedName: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`,
      });

      return res.status(201).json(document);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Unable to save document metadata." });
    }
  });
};

exports.listDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ user: req.userId }).sort({
      uploadedAt: -1,
    });
    return res.json(docs);
  } catch (err) {
    return res.status(500).json({ message: "Unable to load documents." });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!doc) {
      return res.status(404).json({ message: "Document not found." });
    }

    const filePath = path.join(UPLOAD_DIR, doc.storedName);
    fs.unlink(filePath, () => {
      // Ignore delete errors to avoid blocking response
    });

    return res.json({ message: "Document deleted." });
  } catch (err) {
    return res.status(500).json({ message: "Unable to delete document." });
  }
};
