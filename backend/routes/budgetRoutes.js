import express from "express";
import { getBudgetRecommendation } from "../controllers/budgetController.js";

const router = express.Router();
router.post("/recommend", getBudgetRecommendation);
export default router;