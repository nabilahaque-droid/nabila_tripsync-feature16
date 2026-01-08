import express from "express";
import { shareTripToDiscord } from "../controllers/tripController.js";

const router = express.Router();
router.post("/share", shareTripToDiscord);
export default router;