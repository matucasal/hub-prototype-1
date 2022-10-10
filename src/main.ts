import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const prismaService = app.get(PrismaService);
  app.useGlobalPipes(new ValidationPipe());
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
