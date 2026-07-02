import { Inject } from "@nestjs/common";
import Workout from "../../domain/entities/workout.entity";
import type IWorkoutRepository from '../../domain/repositories/IWorkoutRepository';
import { WorkoutModel } from "../../infra/graphql/models/workout.model";
import { WORKOUT_REPOSITORY } from "../../domain/repositories/workout.repository.token";

export class GetWorkoutUseCase {
  constructor(
    @Inject(WORKOUT_REPOSITORY)
    private workoutRepository: IWorkoutRepository,
  ) {}

  async execute(userId: string): Promise<WorkoutModel[]> {
    const workouts: Workout[] = await this.workoutRepository.findByUserId(userId);
    return workouts;
  }
}
