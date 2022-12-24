import express from "express";

const router: express.Router = express.Router();
import { getUserByName } from "../controllers/getControllers";
import {getUserById} from '../controllers/getControllers';

//POST routes
router.get("/getuserbyname/:name", getUserByName);
router.get("/getuserbyid/:id",  getUserById);

export default router;
