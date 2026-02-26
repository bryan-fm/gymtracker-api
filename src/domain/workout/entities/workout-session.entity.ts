import { Workout } from "./workout.entity";

export type WeekDay = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export class WorkoutSession {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly day: WeekDay,
    public readonly exercises: [Workout]
  ) {}

}