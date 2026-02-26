import { WeekDay } from "src/domain/workout/entities/workout-session.entity";
import { Meal } from "./meal.entity";

export class DietPlan {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly day: WeekDay,//Transformar em enum comum pro projeto
    public readonly meals: [Meal]
  ) {}

  sumDailyCalories() {
    let calories: number = 0;

    this.meals.forEach(meal => {
        calories += meal.calories
    });

    return calories;
  }
}
