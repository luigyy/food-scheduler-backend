import ReqHandler from "../types/ReqHandler";
// import FoodSchedule from "../interfaces/foodSchedule";

// import ResponseInterface from "../interfaces/response";
import codes from "../statusCodes";
import HttpError from "../exceptions/HttpException";
import User from "../models/user";
import logger from "../config/logging";
import { updateFirstMeal } from "../functions/date";
// import { type } from "os";

const {
  MISSING_DATA,
  //   EMAIL_UNAVAILABLE,
  //   INVALID_PASSWORD,
  INVALID_EMAIL,
  //   SUCCESS,
  SERVER_ERROR,
  //   USER_NOT_FOUND,
} = codes;

//gets user by name
export const postFirtMeal: ReqHandler = async (req, res, next) => {
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
  //TODO:check if user already have had the first meal

  //get array of meals
  const arrayOfMeals = user.foodSchedule!;
  const updatedArrayOfMeals = updateFirstMeal(arrayOfMeals);
  console.log(updatedArrayOfMeals);
  try {
    await User.updateOne({ email }, { foodSchedule: updatedArrayOfMeals });
    //debugging
  } catch (err) {
    console.log(err);
    logger.error("Error when updating user information");
    return next(new HttpError(SERVER_ERROR));
  }
  //check if theres an entry for today

  res.json(user);
  //   if there is, grab it, else create one
};

// export const postSecondMeal: ReqHandler = async (req, res, next) => {};
