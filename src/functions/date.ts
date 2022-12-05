import FoodSchedule from "../interfaces/foodSchedule";
/**
@param someDate checks if someDate object is today
@returns returns true if it was today, false otherwise
 */
export const isToday = (someDate: Date): boolean => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

/**
 *
 * @param someArray array to check for dates that match the current date of today
 * @returns an array of dates that match todays date
 */

export const arrayOfTodays = (someArray: Array<Date>): Array<Date> => {
  const filteredArray = someArray.filter((date) => isToday(date));
  return filteredArray;
};

/**
 *
 * @param someArray array to loop over
 *
 * @returns an updated array with the field firstMeal set to true for those matching the date of today
 * if firstMeal is already true, respond with false
 */

export const updateFirstMeal = (
  someArray: Array<FoodSchedule>
): Array<FoodSchedule> => {
  //
  if (someArray.length === 0) {
    var tempArray = [];
    const foodSchedulerObject: FoodSchedule = {
      day: new Date(),
      firstMeal: true,
      secondMeal: false,
    };
    tempArray.push(foodSchedulerObject);
    return tempArray;
  }
  const filteredArray = someArray.map((item): any => {
    if (isToday(item.day)) {
      //update first meal field
      const updatedItem: FoodSchedule = {
        day: item.day,
        firstMeal: true,
        secondMeal: item.secondMeal,
      };
      return (item = updatedItem);
    }
    return item;
  });
  return filteredArray;
};

/**
 * @param someArray array to loop over
 * returns true if user already had first meal, false otherwise
 */
export const checkFirstMeal = (someArray: FoodSchedule[]): boolean => {
  //check if someArray is empty
  if (someArray.length === 0) return false;

  someArray.map((item): any => {
    console.log(item.firstMeal);
    if (isToday(item.day)) {
      //check firstMeal field
      if (item.firstMeal) {
        return true;
      }
    }
  });
  return false;
};

//DEBUG: updateArrayOfMeals
// const debugArray: FoodSchedule[] = [
//   { day: new Date(), firstMeal: false, secondMeal: false },
//   { day: new Date("06/06/2002"), firstMeal: false, secondMeal: false },
//   { day: new Date("06/09/1999"), firstMeal: false, secondMeal: false },
// ];
// //DEBUG: updateArrayOfMeals
