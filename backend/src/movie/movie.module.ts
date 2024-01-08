import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';

import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MovieController],
  providers: [MovieService, JwtService],
})
export class MovieModule {}
