import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './users/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './users/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService, UserService, JwtService],
})
export class AppModule {}
