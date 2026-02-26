export class Meal {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly protein: number,
    public readonly calories: number,
    public readonly portion: number,
    public readonly portionKind: number,//Criar entidade pra isso, deve ser cadastral
  ) {}

}