"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const getControllers_1 = require("../controllers/getControllers");
const getControllers_2 = require("../controllers/getControllers");
//POST routes
router.get("/getuserbyname/:name", getControllers_1.getUserByName);
router.get("/getuserbyid/:id", getControllers_2.getUserById);
exports.default = router;
//# sourceMappingURL=getRoutes.js.map