import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getUser(
    filter: { id: number } | { email: string } | { walletAddress: string },
  ) {
    return this.prisma.user.findUnique({
      where: filter,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, 10),
      },
    });

    delete user.password;
    return user;
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const validPassword = await bcrypt.compare(data.password, user.password);

    if (!validPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      issuer: 'asset-tokenization/users-api',
    });

    return token;
  }
}
