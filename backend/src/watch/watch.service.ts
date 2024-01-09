import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateWatchDto } from './dto/create-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WatchService {
  constructor(private prisma: PrismaService) {}

  // Get all favorites
  getWatch(userId: number) {
    return this.prisma.watch.findMany({
      where: {
        userId,
      },
    });
  }

  // Get favorites by type
  getWatchByType(userId: number, type: string) {
    return this.prisma.watch.findMany({
      where: {
        media_type: type,
        userId,
      },
    });
  }

  // Get favorites by id
  getWatchById(userId: number, movieId: number) {
    return this.prisma.watch.findFirst({
      where: {
        id: movieId,
        userId,
      },
    });
  }

  async createWatch(userId: number, dto: CreateWatchDto) {
    const watch = await this.prisma.watch.create({
      data: {
        userId,
        ...dto,
      },
    });
    return watch;
  }

  async editWatch(userId: number, movieId: number, dto: UpdateWatchDto) {
    const watch = await this.prisma.watch.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!watch || watch.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }
    return this.prisma.watch.update({
      where: {
        id: movieId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteWatch(userId: number, movieId: number) {
    const watch = await this.prisma.watch.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!watch || watch.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }
    return this.prisma.watch.delete({
      where: {
        id: movieId,
      },
    });
  }
}
