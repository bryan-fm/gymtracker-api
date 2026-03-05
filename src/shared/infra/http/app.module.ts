import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { PrismaModule } from '../database/prisma.module';
import { WorkoutsModule } from 'src/modules/workouts/workouts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    PrismaModule,
    WorkoutsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
