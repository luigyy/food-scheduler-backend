"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const postControllers_1 = require("../controllers/postControllers");
//POST routes
router.post("/firstmeal", postControllers_1.postFirtMeal);
router.post("/secondmeal", postControllers_1.postSecondMeal);
exports.default = router;
//# sourceMappingURL=postRoutes.js.map