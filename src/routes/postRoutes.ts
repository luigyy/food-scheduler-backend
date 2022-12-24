import express from "express";

const router: express.Router = express.Router();
import { postFirtMeal, postSecondMeal } from "../controllers/postControllers";

//POST routes
router.post("/firstmeal", postFirtMeal);
router.post("/secondmeal", postSecondMeal);

export default router;
