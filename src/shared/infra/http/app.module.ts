import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { PrismaModule } from '../database/prisma.module';
import { WorkoutsModule } from 'src/modules/workouts/workouts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from 'src/modules/auth/auth.resolver';
import { JwtStrategy } from 'src/modules/auth/infrastructure/strategies/jwt.strategy';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    WorkoutsModule,
    AuthModule,
    JwtModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',

        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                },
              }
            : undefined,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthResolver, JwtStrategy],
})
export class AppModule {}
