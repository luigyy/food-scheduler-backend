import ReqHandler from "../types/ReqHandler";
// import FoodSchedule from "../interfaces/foodSchedule";

import ResponseInterface from "../interfaces/response";
import codes from "../statusCodes";
import HttpError from "../exceptions/HttpException";
import User from "../models/user";
import logger from "../config/logging";
// import { updateFirstMeal } from "../functions/date";
// import { debug } from "console";
// import FoodSchedule from "../interfaces/foodSchedule";
import {
  updateFirstMeal,
  checkFirstMeal,
  updateSecondMeal,
  checkSecondMeal,
} from "../functions/date";
// import { type } from "os";

const {
  MISSING_DATA,
  //   EMAIL_UNAVAILABLE,
  //   INVALID_PASSWORD,
  FIRST_MEAL_ERROR,
  INVALID_EMAIL,
  SUCCESS,
  SERVER_ERROR,
  //   USER_NOT_FOUND,
} = codes;

//gets user by name
export const postFirtMeal: ReqHandler = async (req, res, next) => {
  //TODO: make this endpoint only work on firstMeal interval of time (example: 12:00 hr <= time <= 13:00 hr)

  const { email } = req.body;

  if (!email) {
    const fieldsRequired = ["email"];
    return next(new HttpError(MISSING_DATA, fieldsRequired));
  }

  //get user from db
  var user;

  try {
    user = await User.findOne({ email }, { email: 1, foodSchedule: 1 }); //only get foodSchedule and email fields
    if (!user) {
      return next(new HttpError(INVALID_EMAIL));
    }
  } catch {
    logger.error("Error when retrieving user from database");
    return next(new HttpError(SERVER_ERROR));
  }

  //get array of meals from user
  const arrayOfMeals = user.foodSchedule!;

  //check if user already have had the first meal
  if (checkFirstMeal(arrayOfMeals)) {
    const response: ResponseInterface = {
      error: true,
      statusCode: FIRST_MEAL_ERROR.code,
      message: FIRST_MEAL_ERROR.message,
    };
    return res.status(FIRST_MEAL_ERROR.code).json(response);
  }
  //set firstMeal = true for items with date of today
  const updatedArrayOfMeals = updateFirstMeal(arrayOfMeals);

  //update new array of meals to db
  try {
    await User.updateOne({ email }, { foodSchedule: updatedArrayOfMeals });
  } catch (err) {
    logger.error("Error when updating user information");
    return next(new HttpError(SERVER_ERROR));
  }

  //respond with success
  const response: ResponseInterface = {
    statusCode: SUCCESS.code,
    error: false,
    message: SUCCESS.message,
  };
  res.status(SUCCESS.code).json(response);
};

//
export const postSecondMeal: ReqHandler = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    const fieldsRequired = ["email"];
    return next(new HttpError(MISSING_DATA, fieldsRequired));
  }

  //get user from db
  var user;

  try {
    user = await User.findOne({ email }, { email: 1, foodSchedule: 1 }); //only get foodSchedule and email fields
    if (!user) {
      return next(new HttpError(INVALID_EMAIL));
    }
  } catch {
    logger.error("Error when retrieving user from database");
    return next(new HttpError(SERVER_ERROR));
  }

  //get array of meals from user
  const arrayOfMeals = user.foodSchedule!;

  //check if user already have had the first meal
  if (checkSecondMeal(arrayOfMeals)) {
    const response: ResponseInterface = {
      error: true,
      statusCode: FIRST_MEAL_ERROR.code,
      message: FIRST_MEAL_ERROR.message,
    };
    return res.status(FIRST_MEAL_ERROR.code).json(response);
  }
  //set firstMeal = true for items with date of today
  const updatedArrayOfMeals = updateSecondMeal(arrayOfMeals);

  //update new array of meals to db
  try {
    await User.updateOne({ email }, { foodSchedule: updatedArrayOfMeals });
  } catch (err) {
    logger.error("Error when updating user information");
    return next(new HttpError(SERVER_ERROR));
  }

  //respond with success
  const response: ResponseInterface = {
    statusCode: SUCCESS.code,
    error: false,
    message: SUCCESS.message,
  };
  res.status(SUCCESS.code).json(response);
};
