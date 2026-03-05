import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Torna o PrismaService disponível em todo o projeto sem re-importar o módulo
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}