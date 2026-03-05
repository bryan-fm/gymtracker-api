import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { WorkoutModel } from '../models/workout.model';
import { CreateWorkoutInput } from '../inputs/create-workout.input';
import { CreateWorkoutUseCase } from '../../../application/use-cases/CreateWorkoutUseCase';

@Resolver(() => WorkoutModel)
export class WorkoutResolver {
  constructor(private createWorkoutUseCase: CreateWorkoutUseCase) {}

  @Mutation(() => WorkoutModel)
  async createWorkout(
    @Args('input') input: CreateWorkoutInput,
  ): Promise<WorkoutModel> {
    // Chama o Use Case que você criou
    return await this.createWorkoutUseCase.execute(input);
  }

  @Query(() => [WorkoutModel])
  async workouts(): Promise<WorkoutModel[]> {
    return [];
}
}