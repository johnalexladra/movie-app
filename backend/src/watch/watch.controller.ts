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
import { CreateWatchDto, UpdateWatchDto } from './dto';
import { WatchService } from './watch.service';

@UseGuards(JwtGuard)
@Controller('watch')
export class WatchController {
  constructor(private watchService: WatchService) {}

  @Get()
  getWatch(@GetUser('id') userId: number) {
    return this.watchService.getWatch(userId);
  }

  @Get(':id')
  getWatchById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) movieId: number,
  ) {
    return this.watchService.getWatchById(userId, movieId);
  }

  @Get('findByFilter/:type')
  getWatchByType(
    @GetUser('id') userId: number,
    @Param('type') type: string,
  ) {
    return this.watchService.getWatchByType(userId, type);
  }

  @Post()
  createWatch(@GetUser('id') userId: number, @Body() dto: CreateWatchDto) {
    return this.watchService.createWatch(userId, dto);
  }

  @Patch(':id')
  editWatch(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) movieId: number,
    @Body() dto: UpdateWatchDto,
  ) {
    return this.watchService.editWatch(userId, movieId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteWatch(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) movieId: number,
  ) {
    return this.watchService.deleteWatch(userId, movieId);
  }
}
