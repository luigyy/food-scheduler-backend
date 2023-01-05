"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSecondMeal = exports.postFirtMeal = void 0;
const statusCodes_1 = __importDefault(require("../statusCodes"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const user_1 = __importDefault(require("../models/user"));
const logging_1 = __importDefault(require("../config/logging"));
const date_1 = require("../functions/date");
const { MISSING_DATA, INVALID_DATA, SECOND_MEAL_ERROR, FIRST_MEAL_ERROR, SUCCESS, } = statusCodes_1.default;
//gets user by name
const postFirtMeal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO: make this endpoint only work on firstMeal interval of time (example: 12:00 hr <= time <= 13:00 hr)
    //TODO: check _id matches ObjectId length
    const { _id } = req.body;
    if (!_id) {
        const fieldsRequired = ["_id"];
        return next(new HttpException_1.default(MISSING_DATA, fieldsRequired));
    }
    //get user from db
    var user;
    try {
        user = yield user_1.default.findOne({ _id }, { email: 1, foodSchedule: 1 }); //only get foodSchedule and email fields
        if (!user) {
            return next(new HttpException_1.default(INVALID_DATA));
        }
    }
    catch (_a) {
        logging_1.default.error("Error when retrieving user from database");
        return next(new HttpException_1.default(INVALID_DATA));
    }
    //get array of meals from user
    const arrayOfMeals = user.foodSchedule;
    //check if user already have had the first meal
    console.log(date_1.checkFirstMeal(arrayOfMeals));
    if (date_1.checkFirstMeal(arrayOfMeals)) {
        const response = {
            error: true,
            statusCode: FIRST_MEAL_ERROR.code,
            message: FIRST_MEAL_ERROR.message,
        };
        return res.status(FIRST_MEAL_ERROR.code).json(response);
    }
    //set firstMeal = true for items with date of today
    const updatedArrayOfMeals = date_1.updateFirstMeal(arrayOfMeals);
    //update new array of meals to db
    try {
        yield user_1.default.updateOne({ _id }, { foodSchedule: updatedArrayOfMeals });
    }
    catch (err) {
        logging_1.default.error("Error when updating user information");
        return next(new HttpException_1.default(INVALID_DATA));
    }
    //respond with success
    const response = {
        statusCode: SUCCESS.code,
        error: false,
        message: SUCCESS.message,
    };
    res.status(SUCCESS.code).json(response);
});
exports.postFirtMeal = postFirtMeal;
//
const postSecondMeal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    if (!_id) {
        const fieldsRequired = ["_id"];
        return next(new HttpException_1.default(MISSING_DATA, fieldsRequired));
    }
    //get user from db
    var user;
    try {
        user = yield user_1.default.findOne({ _id }, { email: 1, foodSchedule: 1 }); //only get foodSchedule and email fields
        if (!user) {
            return next(new HttpException_1.default(INVALID_DATA));
        }
    }
    catch (err) {
        logging_1.default.error("Error when retrieving user from database");
        return next(new HttpException_1.default(INVALID_DATA));
    }
    //get array of meals from user
    const arrayOfMeals = user.foodSchedule;
    //check if user already have had the first meal
    if (date_1.checkSecondMeal(arrayOfMeals)) {
        const response = {
            error: true,
            statusCode: SECOND_MEAL_ERROR.code,
            message: SECOND_MEAL_ERROR.message,
        };
        return res.status(SECOND_MEAL_ERROR.code).json(response);
    }
    //set second = true for items with date of today
    const updatedArrayOfMeals = date_1.updateSecondMeal(arrayOfMeals);
    //update new array of meals to db
    try {
        yield user_1.default.updateOne({ _id }, { foodSchedule: updatedArrayOfMeals });
    }
    catch (err) {
        logging_1.default.error("Error when updating user information");
        return next(new HttpException_1.default(INVALID_DATA));
    }
    //respond with success
    const response = {
        statusCode: SUCCESS.code,
        error: false,
        message: SUCCESS.message,
    };
    res.status(SUCCESS.code).json(response);
});
exports.postSecondMeal = postSecondMeal;
//# sourceMappingURL=postControllers.js.map