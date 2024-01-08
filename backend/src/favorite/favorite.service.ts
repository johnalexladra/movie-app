import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  // Get all favorites
  getFavorites(userId: number) {
    return this.prisma.favorite.findMany({
      where: {
        userId,
      },
    });
  }

  // Get favorites by type
  getFavoritesByType(userId: number, type: string) {
    return this.prisma.favorite.findMany({
      where: {
        media_type: type,
        userId,
      },
    });
  }

  // Get favorites by id
  getFavoriteById(userId: number, movieId: number) {
    return this.prisma.favorite.findFirst({
      where: {
        id: movieId,
        userId,
      },
    });
  }

  async createFavorite(userId: number, dto: CreateFavoriteDto) {
    const favorite = await this.prisma.favorite.create({
      data: {
        userId,
        ...dto,
      },
    });
    return favorite;
  }

  async editFavorite(userId: number, movieId: number, dto: UpdateFavoriteDto) {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!favorite || favorite.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }
    return this.prisma.favorite.update({
      where: {
        id: movieId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteFavorite(userId: number, movieId: number) {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!favorite || favorite.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }
    return this.prisma.favorite.delete({
      where: {
        id: movieId,
      },
    });
  }
}
