import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';

import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, JwtService],
})
export class FavoriteModule {}