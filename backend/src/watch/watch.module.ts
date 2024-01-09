import { Module } from '@nestjs/common';
import { WatchService } from './watch.service';
import { WatchController } from './watch.controller';

import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [WatchController],
  providers: [WatchService, JwtService],
})
export class WatchModule {}