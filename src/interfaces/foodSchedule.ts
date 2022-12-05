interface FoodSchedule {
  day: Date;
  firstMeal: boolean;
  secondMeal: boolean;
  //number of meals, in this case is only for lunch and dinner, each once.
  //interface can be changed to match number of meals per time
}

export default FoodSchedule;
