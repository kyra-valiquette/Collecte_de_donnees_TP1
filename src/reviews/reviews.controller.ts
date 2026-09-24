import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Review } from './entities/review.entity.js';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: 'Create a review' })
  @ApiResponse({
  status: 201,
  description: 'Review successfully created.',
  type:Review,
  })
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }
  @ApiOperation({ summary: 'Get reviews for a place' })
  @ApiResponse({
    status: 200,
    description: 'Reviews associated with the place successfully found.',
    type: [Review],
  })
  @ApiParam({
    name: 'placeId',  
    description: 'Identifiant unique de la place.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Get('places/:placeId')
  findByPlace(@Param('placeId') placeId: string) {
    return this.reviewsService.findByPlace(placeId);
  }
  @ApiOperation({ summary: 'Find reviews' })
  @ApiResponse({
  status: 200,
  description: 'Reviews successfully found.',
  type:[Review],
  })
  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }
  @ApiOperation({ summary: 'Find a review' })
  @ApiResponse({
  status: 200,
  description: 'Review successfully found.',
  type:Review,
  })
  @ApiParam({
    name: 'id',
    description: 'Identifiant unique du review',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }
  @ApiOperation({ summary: 'Update a review' })
  @ApiResponse({
  status: 200,
  description: 'Review successfully updated.',
  type:Review,
  })
  @ApiParam({
    name: 'id',
    description: 'Identifiant unique du review',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }
  @ApiOperation({ summary: 'Delete a review' })
  @ApiResponse({
  status: 200,
  description: 'Review successfully deleted.',
  type:Review,
  })
  @ApiParam({
    name: 'id',
    description: 'Identifiant unique du review',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
