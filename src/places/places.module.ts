import { Module } from '@nestjs/common';
import { PlacesService } from './places.service.js';
import { PlacesController } from './places.controller.js';
import { JsonRepository } from '../common/persistence/json.repository.js';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, JsonRepository],
})
export class PlacesModule {}
