import { Module } from '@nestjs/common';
import { WorkoutResolver } from './infra/graphql/resolvers/workout.resolver';
import { CreateWorkoutUseCase } from './application/use-cases/CreateWorkoutUseCase';
import { PrismaWorkoutRepository } from './infra/persistence/PrismaWorkoutRepository';
import { GetWorkoutUseCase } from './application/use-cases/GetWorkoutUseCase';
@Module({
  providers: [
    WorkoutResolver,
    CreateWorkoutUseCase,
    GetWorkoutUseCase,
    PrismaWorkoutRepository,
    {
      provide: 'WORKOUT_REPOSITORY',
      useClass: PrismaWorkoutRepository,
    },
  ],
})
export class WorkoutsModule {}
