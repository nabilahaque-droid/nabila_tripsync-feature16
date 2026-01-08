const express = require("express");
const {
  uploadDocument,
  listDocuments,
  deleteDocument,
} = require("../controllers/documentController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, listDocuments);
router.post("/upload", auth, uploadDocument);
router.delete("/:id", auth, deleteDocument);

module.exports = router;
