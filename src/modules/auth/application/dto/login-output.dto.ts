import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginOutputDto {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  token: string;
}
