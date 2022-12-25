import ReqHandler from "../types/ReqHandler";
// import FoodSchedule from "../interfaces/foodSchedule";

import ResponseInterface from "../interfaces/response";
import codes from "../statusCodes";
import HttpError from "../exceptions/HttpException";
import User from "../models/user";
import logger from "../config/logging";
import {
  updateFirstMeal,
  checkFirstMeal,
  updateSecondMeal,
  checkSecondMeal,
} from "../functions/date";

const {
  MISSING_DATA,
  INVALID_DATA,
  SECOND_MEAL_ERROR,
  FIRST_MEAL_ERROR,
  SUCCESS,
} = codes;

//gets user by name
export const postFirtMeal: ReqHandler = async (req, res, next) => {
  //TODO: make this endpoint only work on firstMeal interval of time (example: 12:00 hr <= time <= 13:00 hr)

  //TODO: check _id matches ObjectId length
  const { _id } = req.body;

  if (!_id) {
    const fieldsRequired = ["_id"];
    return next(new HttpError(MISSING_DATA, fieldsRequired));
  }

  //get user from db
  var user;

  try {
    user = await User.findOne({ _id }, { email: 1, foodSchedule: 1 }); //only get foodSchedule and email fields
    if (!user) {
      return next(new HttpError(INVALID_DATA));
    }
  } catch {
    logger.error("Error when retrieving user from database");
    return next(new HttpError(INVALID_DATA));
  }

  //get array of meals from user
  const arrayOfMeals = user.foodSchedule!;

  //check if user already have had the first meal
  console.log(checkFirstMeal(arrayOfMeals))
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
    await User.updateOne({ _id }, { foodSchedule: updatedArrayOfMeals });
  } catch (err) {
    logger.error("Error when updating user information");
    return next(new HttpError(INVALID_DATA));
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
  const { _id } = req.body;

  if (!_id) {
    const fieldsRequired = ["_id"];
    return next(new HttpError(MISSING_DATA, fieldsRequired));
  }

  //get user from db
  var user;

  try {
    user = await User.findOne({ _id }, { email: 1, foodSchedule: 1 }); //only get foodSchedule and email fields
    if (!user) {
      return next(new HttpError(INVALID_DATA));
    }
  } catch (err) {
    logger.error("Error when retrieving user from database");
    return next(new HttpError(INVALID_DATA));
  }

  //get array of meals from user
  const arrayOfMeals = user.foodSchedule!;

  //check if user already have had the first meal
  if (checkSecondMeal(arrayOfMeals)) {
    const response: ResponseInterface = {
      error: true,
      statusCode: SECOND_MEAL_ERROR.code,
      message: SECOND_MEAL_ERROR.message,
    };
    return res.status(SECOND_MEAL_ERROR.code).json(response);
  }
  //set second = true for items with date of today
  const updatedArrayOfMeals = updateSecondMeal(arrayOfMeals);

  //update new array of meals to db
  try {
    await User.updateOne({ _id }, { foodSchedule: updatedArrayOfMeals });
  } catch (err) {
    logger.error("Error when updating user information");
    return next(new HttpError(INVALID_DATA));
  }

  //respond with success
  const response: ResponseInterface = {
    statusCode: SUCCESS.code,
    error: false,
    message: SUCCESS.message,
  };
  res.status(SUCCESS.code).json(response);
};
