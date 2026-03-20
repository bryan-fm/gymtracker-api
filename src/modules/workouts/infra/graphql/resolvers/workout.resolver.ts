import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { WorkoutModel } from '../models/workout.model';
import { CreateWorkoutInput } from '../inputs/create-workout.input';
import { CreateWorkoutUseCase } from '../../../application/use-cases/CreateWorkoutUseCase';
import { GetWorkoutUseCase } from 'src/modules/workouts/application/use-cases/GetWorkoutUseCase';
import { PinoLogger } from 'nestjs-pino';

@Resolver(() => WorkoutModel)
export class WorkoutResolver {
  constructor(
    private createWorkoutUseCase: CreateWorkoutUseCase,
    private getWorkoutUseCase: GetWorkoutUseCase,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(WorkoutResolver.name);
  }

  @Mutation(() => WorkoutModel)
  async createWorkout(
    @Args('input') input: CreateWorkoutInput,
  ): Promise<WorkoutModel> {
    this.logger.info('Buscando Exercícios');
    const workout = await this.createWorkoutUseCase.execute(input);
    return workout;
  }

  @Query(() => [WorkoutModel])
  async workouts(): Promise<WorkoutModel[]> {
    const workouts = await this.getWorkoutUseCase.execute();
    return workouts;
  }
}
