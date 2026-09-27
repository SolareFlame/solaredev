import { Controller, Get, Logger, ServiceUnavailableException } from '@nestjs/common';
import { StatsService, type CommitStats } from './stats.service.js';

@Controller('stats')
export class StatsController {
  private readonly logger = new Logger(StatsController.name);

  constructor(private readonly statsService: StatsService) {}

  @Get()
  async get(): Promise<CommitStats> {
    try {
      return await this.statsService.getCommitStats();
    } catch (error) {
      // Only reachable before the first successful fetch (or if the database is down).
      this.logger.error(`Stats unavailable: ${String(error)}`);
      throw new ServiceUnavailableException('Stats are not available yet');
    }
  }
}
