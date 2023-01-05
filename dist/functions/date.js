"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFirstMeal = exports.checkSecondMeal = exports.updateSecondMeal = exports.updateFirstMeal = exports.arrayOfTodays = exports.isToday = void 0;
/**
@param someDate checks if someDate object is today
@returns returns true if it was today, false otherwise
 */
const isToday = (someDate) => {
    const today = new Date();
    return (someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear());
};
exports.isToday = isToday;
/**
 * checks if theres an entry for today
 *
 */
const entryForToday = (someArray) => {
    //loop over the array
    for (var i = 0; i < someArray.length; i++) {
        const item = someArray[i];
        if (exports.isToday(item.day)) {
            return true;
        }
    }
    return false;
};
/**
 *
 * @param someArray array to check for dates that match the current date of today
 * @returns an array of dates that match todays date
 */
const arrayOfTodays = (someArray) => {
    const filteredArray = someArray.filter((date) => exports.isToday(date));
    return filteredArray;
};
exports.arrayOfTodays = arrayOfTodays;
/**
 *
 * @param someArray array to loop over
 *
 * @returns an updated array with the field firstMeal set to true for those matching the date of today
 * if firstMeal is already true, respond with false
 */
const updateFirstMeal = (someArray) => {
    //check if empty
    if (someArray.length === 0) {
        var tempArray = [];
        const foodSchedulerObject = {
            day: new Date(),
            firstMeal: true,
            secondMeal: false,
        };
        tempArray.push(foodSchedulerObject);
        return tempArray;
    }
    //check if entry for today
    if (!entryForToday(someArray)) {
        //no entry, create one
        const foodSchedulerObject = {
            day: new Date(),
            firstMeal: false,
            secondMeal: false,
        };
        someArray.push(foodSchedulerObject);
    }
    const filteredArray = someArray.map((item) => {
        if (exports.isToday(item.day)) {
            //update first meal field
            const updatedItem = {
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
exports.updateFirstMeal = updateFirstMeal;
//
const updateSecondMeal = (someArray) => {
    //check if empty
    if (someArray.length === 0) {
        var tempArray = [];
        const foodSchedulerObject = {
            day: new Date(),
            firstMeal: false,
            secondMeal: true,
        };
        tempArray.push(foodSchedulerObject);
        return tempArray;
    }
    //check if entry for today
    if (!entryForToday(someArray)) {
        //no entry, create one
        const foodSchedulerObject = {
            day: new Date(),
            firstMeal: false,
            secondMeal: false,
        };
        someArray.push(foodSchedulerObject);
    }
    const filteredArray = someArray.map((item) => {
        if (exports.isToday(item.day)) {
            //update second meal field
            const updatedItem = {
                day: item.day,
                firstMeal: item.firstMeal,
                secondMeal: true,
            };
            return (item = updatedItem);
        }
        return item;
    });
    return filteredArray;
};
exports.updateSecondMeal = updateSecondMeal;
/**
 * @param someArray array to loop over
 * returns true if user already have had first meal for today, false otherwise
 */
const checkSecondMeal = (someArray) => {
    //check if someArray is empty
    if (someArray.length === 0)
        return false;
    //loop over the array
    for (var i = 0; i < someArray.length; i++) {
        //check for isToday
        var item = someArray[i];
        if (exports.isToday(item.day)) {
            if (item.secondMeal) {
                return true;
            }
        }
    }
    return false;
};
exports.checkSecondMeal = checkSecondMeal;
/**
 * @param someArray array to loop over
 * returns true if user already have had first meal for today, false otherwise
 */
const checkFirstMeal = (someArray) => {
    //check if someArray is empty
    if (someArray.length === 0)
        return false;
    //loop over the array
    for (var i = 0; i < someArray.length; i++) {
        //check for isToday
        var item = someArray[i];
        if (exports.isToday(item.day)) {
            if (item.firstMeal) {
                return true;
            }
        }
    }
    return false;
};
exports.checkFirstMeal = checkFirstMeal;
//DEBUG: updateArrayOfMeals
// const debugArray: FoodSchedule[] = [
//   { day: new Date(), firstMeal: false, secondMeal: false },
//   { day: new Date("06/06/2002"), firstMeal: false, secondMeal: false },
//   { day: new Date("06/09/1999"), firstMeal: false, secondMeal: false },
// ];
// //DEBUG: updateArrayOfMeals
//# sourceMappingURL=date.js.map