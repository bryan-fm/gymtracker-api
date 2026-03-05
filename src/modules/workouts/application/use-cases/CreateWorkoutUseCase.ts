import { Inject } from "@nestjs/common";
import Workout from "../../domain/entities/workout.entity";
import type IWorkoutRepository from "../../domain/repositories/IWorkoutRepository";
import { WorkoutModel } from "../../infra/graphql/models/workout.model";
import { CreateWorkoutDTO } from "../dtos/CreateWorkoutDTO";
import { WORKOUT_REPOSITORY } from "../../domain/repositories/workout.repository.token";

export class CreateWorkoutUseCase {
    constructor(
    @Inject(WORKOUT_REPOSITORY)
    private workoutRepository: IWorkoutRepository,
  ) {}

  async execute(data: CreateWorkoutDTO): Promise<WorkoutModel> {
  const workout = new Workout(
      Math.floor(Math.random() * 1000000), // Gera o ID aqui ou na entidade
      data.name,
      data.description,
      data.image,
      data.kind as any, // Você pode querer mapear isso para um Enum interno
      data.reps,
      data.weight
    );
    return await this.workoutRepository.save(workout);
  }
}