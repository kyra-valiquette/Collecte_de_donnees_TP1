import { Module } from '@nestjs/common';
import { PlacesModule } from './places/places.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),PlacesModule, ReviewsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
