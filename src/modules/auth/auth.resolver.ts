import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { AuthService } from "./application/services/auth.service";
import { RegisterDto } from "./application/dto/register.dto";
import { LoginDto } from "./application/dto/login.dto";
import { GqlAuthGuard } from "./infrastructure/guards/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from "./infrastructure/decorators/current-user.decorator";
import { LoginOutputDto } from "./application/dto/login-output.dto";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async register(@Args('data') data: RegisterDto) {
    const result = await this.authService.register(data);
    return result.access_token;
  }

  @Mutation(() => LoginOutputDto)
  async login(@Args('data') data: LoginDto) {
    const result = await this.authService.login(data);
    return result;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => String)
  async me(@CurrentUser() user: any) {
    return user.email;
  }
}