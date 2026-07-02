import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { GqlAuthGuard } from './infrastructure/guards/gql-auth.guard';
import { AuthResolver } from './auth.resolver';
import { UsersService } from '../users/application/services/users.service';
import { AuthService } from './application/services/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    GqlAuthGuard,
    AuthResolver,
    UsersService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
