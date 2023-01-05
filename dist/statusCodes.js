"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codeFor = {
    MISSING_DATA: {
        code: 401,
        message: "Missing data! Make sure all fields are given.",
    },
    EMAIL_UNAVAILABLE: { code: 401, message: "Email is already taken" },
    INVALID_PASSWORD: { code: 401, message: "Invalid password" },
    INVALID_DATA: { code: 401, message: "Invalid Data" },
    INVALID_EMAIL: { code: 401, message: "Email is not linked to any account" },
    SUCCESS: { code: 200, message: "Success" },
    SERVER_ERROR: { code: 503, message: "Server error" },
    MISSING_TOKEN: {
        code: 401,
        message: "Authentication token not found on auth header",
    },
    INVALID_TOKEN: { code: 401, message: "Invalid authentication token" },
    UNAUTHORIZED: { code: 403, message: "Service not available for your role" },
    USER_NOT_FOUND: {
        code: 404,
        message: "Could not found user with the provided information",
    },
    FIRST_MEAL_ERROR: {
        code: 401,
        message: "User already have had first meal!",
    },
    SECOND_MEAL_ERROR: {
        code: 401,
        message: "User already have had second meal!",
    },
};
exports.default = codeFor;
//# sourceMappingURL=statusCodes.js.map