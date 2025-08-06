import { Module } from '@nestjs/common';
import { GridWsService } from './grid-ws.service';

@Module({
  controllers: [],
  providers: [GridWsService],
})
export class GridModule {}
