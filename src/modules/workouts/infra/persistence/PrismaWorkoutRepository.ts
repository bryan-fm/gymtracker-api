import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../shared/infra/database/prisma.service';
import IWorkoutRepository from '../../domain/repositories/IWorkoutRepository';
import Workout from '../../domain/entities/workout.entity';

@Injectable()
export class PrismaWorkoutRepository implements IWorkoutRepository {
  constructor(private prisma: PrismaService) {}

  async save(workout: Workout): Promise<Workout> {
    return await this.prisma.workout.create({
      data: {
        id: workout.id,
        name: workout.name,
        description: workout.description,
        image: workout.image,
        kind: workout.kind,
        reps: workout.reps,
        weight: workout.weight,
      },
    });
  }
}