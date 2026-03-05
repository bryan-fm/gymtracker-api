import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Kind } from '@prisma/client';

registerEnumType(Kind, {
  name: 'Kind',
});

@InputType()
export class CreateWorkoutInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  image: string;

  @Field(() => Kind)
  kind: Kind;

  @Field()
  reps: number;

  @Field()
  weight: number;
}