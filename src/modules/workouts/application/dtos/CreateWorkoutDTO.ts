import { Kind } from '@prisma/client';

export interface CreateWorkoutDTO {
  name: string;
  description: string;
  image: string;
  kind: Kind;
  reps: number;
  weight: number;
  sets: number;
  userId: string;
}
