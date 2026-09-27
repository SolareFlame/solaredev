import { Module } from '@nestjs/common';
import { GithubClient } from './github.client.js';
import { StatsController } from './stats.controller.js';
import { StatsService } from './stats.service.js';

@Module({
  controllers: [StatsController],
  providers: [StatsService, GithubClient],
})
export class StatsModule {}
