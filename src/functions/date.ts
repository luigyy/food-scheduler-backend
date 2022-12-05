// /**
// generates a random date
// @returns random date between january 1st, 2012 and today.
//  */
// function randomDate(): Date {
//   const start = new Date(2012, 0, 1);
//   const end = new Date();
//   return new Date(
//     start.getTime() + Math.random() * (end.getTime() - start.getTime())
//   );
// }

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
  });
  console.log(filteredArray);
  return filteredArray;
};

//DEBUGGIN:

// const randomDatesList = [];
// //create list of random date
// for (var i: number = 0; i < 9; i++) {
//   var myDate: Date = randomDate();
//   randomDatesList.push(myDate);
// }

// const today = new Date();

// randomDatesList.push(today);

// console.log(randomDatesList);

// const filteredArray = randomDatesList.filter((date) => isToday(date));
