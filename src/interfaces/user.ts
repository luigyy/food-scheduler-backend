import { Document } from "mongoose";
import userRoleEnum from "./userRole";
import FoodSchedule from "./foodSchedule";

//extending document will be deprecated
export default interface UserInterface extends Document {
  name: string;
  lastName: string;
  email: string;
  role: userRoleEnum;
  foodSchedule?: Array<FoodSchedule>;
}
