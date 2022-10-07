import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Prisma, User as UserModel } from '@prisma/client';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/')
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    try {
      const user = await this.usersService.createUser(userData);
      return user;
    } catch (err) {
      console.log('err', err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (err.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this userwallet',
          );
        }
      }
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error:
            'There is a unique constraint violation, a new user cannot be created with this userwallet',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
