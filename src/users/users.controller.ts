import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User as UserModel } from '@prisma/client';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/')
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.usersService.createUser(userData);
  }
}
