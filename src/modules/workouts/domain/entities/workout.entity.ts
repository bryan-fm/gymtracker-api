export type Kind = 'BICEPS' | 'TRICPES' | 'LEGS' | 'CHEST' | 'SHOULDER'| 'BACK' | 'CARDIO' ;

class Workout {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly image: string,
    public readonly kind: Kind,
    public readonly reps: number,
    public readonly weight: number,
    public readonly sets: number,
    public readonly userId: string,
  ) {}
}

export default Workout;
