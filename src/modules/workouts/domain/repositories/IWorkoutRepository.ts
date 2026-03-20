import Workout from '../entities/workout.entity';

interface IWorkoutRepository {
  //findById(id: string): Promise<Workout | null>;
  findAll(): Promise<Workout[] | []>;
  save(workout: Workout): Promise<Workout>;
  //delete(workoutId: string): Promise<void>;
}

export default IWorkoutRepository;
