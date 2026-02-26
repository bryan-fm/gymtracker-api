export type Kind = 'BICEPS' | 'TRICPES' | 'LEGS' | 'CHEST' | 'SHOULDER'| 'BACK' | 'CARDIO' ;

export class Workout {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly image: string,
    public readonly kind: Kind,
    public readonly reps: number,
    public readonly weight :number
  ) {}
}