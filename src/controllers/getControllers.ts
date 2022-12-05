import ReqHandler from "../types/ReqHandler";
import ResponseInterface from "../interfaces/response";
import codes from "../statusCodes";
import HttpError from "../exceptions/HttpException";
import User from "../models/user";
import logger from "../config/logging";

const {
  //   MISSING_DATA,
  //   EMAIL_UNAVAILABLE,
  //   INVALID_PASSWORD,
  //   INVALID_EMAIL,
  SUCCESS,
  SERVER_ERROR,
  USER_NOT_FOUND,
} = codes;

//gets user by name
export const getUserByName: ReqHandler = async (req, res, next) => {
  //POST /register
  const { name } = req.body;

  //get user from database
  try {
    const result = await User.find(
      { name },
      { name: 1, lastName: 1, email: 1, foodSchedule: 1 } //only get this fields
    );
    if (result) {
      const response: ResponseInterface = {
        statusCode: 200,
        message: "User(s) retrieve from data base by name " + name,
        error: false,
        data: { userData: result },
      };
      return res.status(SUCCESS.code).json(response);
    }
  } catch (err) {
    logger.error("Error when getting user from database");
    return next(new HttpError(SERVER_ERROR));
  }

  //no user found
  const response: ResponseInterface = {
    statusCode: USER_NOT_FOUND.code,
    message: USER_NOT_FOUND.message,
    error: true,
  };
  return res.status(USER_NOT_FOUND.code).json(response);
};
