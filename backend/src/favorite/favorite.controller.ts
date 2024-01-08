import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { CreateFavoriteDto, UpdateFavoriteDto } from './dto';
import { FavoriteService } from './favorite.service';

@UseGuards(JwtGuard)
@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  getFavorites(@GetUser('id') userId: number) {
    return this.favoriteService.getFavorites(userId);
  }

  @Get(':id')
  getFavoriteById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) movieId: number,
  ) {
    return this.favoriteService.getFavoriteById(userId, movieId);
  }

  @Get('findByFilter/:type')
  getFavoriteByType(
    @GetUser('id') userId: number,
    @Param('type') type: string,
  ) {
    return this.favoriteService.getFavoritesByType(userId, type);
  }

  @Post()
  createFavorite(@GetUser('id') userId: number, @Body() dto: CreateFavoriteDto) {
    return this.favoriteService.createFavorite(userId, dto);
  }

  @Patch(':id')
  editFavorite(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) movieId: number,
    @Body() dto: UpdateFavoriteDto,
  ) {
    return this.favoriteService.editFavorite(userId, movieId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteFavorite(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) movieId: number,
  ) {
    return this.favoriteService.deleteFavorite(userId, movieId);
  }
}
