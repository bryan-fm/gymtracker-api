import { Kind } from "generated/prisma";

export interface CreateWorkoutDTO {
  name: string;
  description: string;
  image: string;
  kind: Kind
  reps: number;
  weight: number;
}