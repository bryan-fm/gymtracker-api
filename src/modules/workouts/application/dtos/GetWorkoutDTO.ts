import { CreateWorkoutDTO } from './CreateWorkoutDTO';

export interface GetWorkoutDTO extends CreateWorkoutDTO {
  id: number;
}
