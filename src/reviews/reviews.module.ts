import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service.js';
import { ReviewsController } from './reviews.controller.js';
import { JsonRepository } from '../common/persistence/json.repository.js';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, JsonRepository],
})
export class ReviewsModule {}
