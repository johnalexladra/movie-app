import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new ConflictException('email duplicated');

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });

    const { password, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }



  async update(userId: number, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    delete user.password;
    return user;
  }

}
