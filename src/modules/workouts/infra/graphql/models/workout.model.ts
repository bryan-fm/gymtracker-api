import { Field, ID, ObjectType, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class WorkoutModel {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  kind: string;

  @Field(() => Int)
  reps: number;

  @Field(() => Float)
  weight: number;

  @Field(() => Int)
  sets: number;

  @Field({ nullable: true })
  image?: string;

  @Field(() => String)
  userId?: string;
}
