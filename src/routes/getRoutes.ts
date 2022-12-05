import express from "express";

const router: express.Router = express.Router();
import { getUserByName } from "../controllers/getControllers";

//POST routes
router.get("/getuserbyname", getUserByName);

export default router;
