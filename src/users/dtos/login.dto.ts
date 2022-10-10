import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class LoginDto
  implements Omit<CreateUserDto, 'name' | 'surname' | 'role'>
{
  walletAddress: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
