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
exports.getUserById = exports.getUserByName = void 0;
const statusCodes_1 = __importDefault(require("../statusCodes"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const user_1 = __importDefault(require("../models/user"));
const logging_1 = __importDefault(require("../config/logging"));
const { MISSING_DATA, 
//   EMAIL_UNAVAILABLE,
//   INVALID_PASSWORD,
//   INVALID_EMAIL,
SUCCESS, SERVER_ERROR, USER_NOT_FOUND, } = statusCodes_1.default;
//gets user by name
const getUserByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //POST /register
    //@ts-ignore
    const name = req.params.name;
    //check if name is given
    if (!name) {
        const fieldsRequired = ["name"];
        return next(new HttpException_1.default(MISSING_DATA, fieldsRequired));
    }
    //get user from database
    try {
        const result = yield user_1.default.find({ name }, { _id: 1, name: 1, lastName: 1, email: 1, foodSchedule: 1 } //only get this fields
        );
        if (result.length !== 0) {
            const response = {
                statusCode: 200,
                message: "User(s) retrieve from data base by name " + name,
                error: false,
                data: { userData: result },
            };
            return res.status(SUCCESS.code).json(response);
        }
    }
    catch (err) {
        logging_1.default.error("Error when getting user from database");
        return next(new HttpException_1.default(SERVER_ERROR));
    }
    //no user found
    const response = {
        statusCode: USER_NOT_FOUND.code,
        message: USER_NOT_FOUND.message,
        error: true,
    };
    return res.status(USER_NOT_FOUND.code).json(response);
});
exports.getUserByName = getUserByName;
//gets user by email (email is unique)
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //POST /register
    //@ts-ignore
    const id = req.params.id;
    //check if name is given
    if (!id) {
        const fieldsRequired = ["id"];
        return next(new HttpException_1.default(MISSING_DATA, fieldsRequired));
    }
    //get user from database
    try {
        const result = yield user_1.default.find({ _id: id }, { _id: 1, name: 1, lastName: 1, email: 1, foodSchedule: 1 } //only get this fields
        );
        if (result.length !== 0) {
            const response = {
                statusCode: 200,
                message: "User(s) retrieve from data base by id: " + id,
                error: false,
                data: { userData: result },
            };
            return res.status(SUCCESS.code).json(response);
        }
    }
    catch (err) {
        logging_1.default.error("Error when getting user from database");
        return next(new HttpException_1.default(SERVER_ERROR));
    }
    //no user found
    const response = {
        statusCode: USER_NOT_FOUND.code,
        message: USER_NOT_FOUND.message,
        error: true,
    };
    return res.status(USER_NOT_FOUND.code).json(response);
});
exports.getUserById = getUserById;
//# sourceMappingURL=getControllers.js.map