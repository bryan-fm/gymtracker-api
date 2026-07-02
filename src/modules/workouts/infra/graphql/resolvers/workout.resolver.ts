import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { WorkoutModel } from '../models/workout.model';
import { CreateWorkoutInput } from '../inputs/create-workout.input';
import { CreateWorkoutUseCase } from '../../../application/use-cases/CreateWorkoutUseCase';
import { GetWorkoutUseCase } from 'src/modules/workouts/application/use-cases/GetWorkoutUseCase';
import { PinoLogger } from 'nestjs-pino';
import { GqlAuthGuard } from 'src/modules/auth/infrastructure/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/modules/auth/infrastructure/decorators/current-user.decorator';

@Resolver(() => WorkoutModel)
export class WorkoutResolver {
  constructor(
    private createWorkoutUseCase: CreateWorkoutUseCase,
    private getWorkoutUseCase: GetWorkoutUseCase,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(WorkoutResolver.name);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => WorkoutModel)
  async createWorkout(
    @Args('input') input: CreateWorkoutInput,
    @CurrentUser() user: any,
  ): Promise<WorkoutModel> {
    this.logger.info('Buscando Exercícios');
    const workout = await this.createWorkoutUseCase.execute({
      ...input,
      userId: user.id,
    });
    return workout;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [WorkoutModel])
  async workouts(@CurrentUser() user: any): Promise<WorkoutModel[]> {
    this.logger.info('Buscando Exercícios');
    console.log(user.userId);
    const workouts = await this.getWorkoutUseCase.execute(user.userId);
    return workouts;
  }
}
