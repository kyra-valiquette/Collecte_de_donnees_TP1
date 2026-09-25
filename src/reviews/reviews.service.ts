import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { JsonRepository } from '../common/persistence/json.repository.js';
import { randomUUID } from 'node:crypto';
import { Review } from './entities/review.entity.js';
import { Place } from '../places/entities/place.entity.js';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly jsonRepository: JsonRepository,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const data = await this.jsonRepository.readData();

    const place = data.places.find(
      (place: Place) => place.id === createReviewDto.placeId,
    );

    if (!place) {
      throw new NotFoundException(
        `Place with id '${createReviewDto.placeId}' not found.`,
      );
    }

    const review = {
      id: randomUUID(),
      ...createReviewDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.reviews.push(review);

    this.updatePlaceRating(place, data.reviews);

    await this.jsonRepository.writeData(data);

    return review;
  }

  async findAll() {
    const data = await this.jsonRepository.readData();

    return data.reviews;
  }

  async findOne(id: string) {
    const data = await this.jsonRepository.readData();

    const review = data.reviews.find(
      (review: Review) => review.id === id,
    );

    if (!review) {
      throw new NotFoundException(
        `Review with id '${id}' not found.`,
      );
    }

    return review;
  }

  async update(
    id: string,
    updateReviewDto: UpdateReviewDto,
  ) {
    const data = await this.jsonRepository.readData();

    const review = data.reviews.find(
      (review: Review) => review.id === id,
    );

    if (!review) {
      throw new NotFoundException(
        `Review with id '${id}' not found.`,
      );
    }

    Object.assign(review, updateReviewDto);

    review.updatedAt = new Date().toISOString();

    const place = data.places.find(
      (place: Place) => place.id === review.placeId,
    );

    if (!place) {
      throw new NotFoundException(
        `Place with id '${review.placeId}' not found.`,
      );
    }

    this.updatePlaceRating(place, data.reviews);

    await this.jsonRepository.writeData(data);

    return review;
  }

  async remove(id: string) {
    const data = await this.jsonRepository.readData();

    const reviewIndex = data.reviews.findIndex(
      (review: Review) => review.id === id,
    );

    if (reviewIndex === -1) {
      throw new NotFoundException(
        `Review with id '${id}' not found.`,
      );
    }

    const deletedReview = data.reviews[reviewIndex];

    const place = data.places.find(
      (place: Place) => place.id === deletedReview.placeId,
    );

    if (!place) {
      throw new NotFoundException(
        `Place with id '${deletedReview.placeId}' not found.`,
      );
    }

    data.reviews.splice(reviewIndex, 1);

    this.updatePlaceRating(place, data.reviews);

    await this.jsonRepository.writeData(data);

    return deletedReview;
  }

  async findByPlace(placeId: string) {
    const data = await this.jsonRepository.readData();

    const placeExists = data.places.some(
      (place: Place) => place.id === placeId,
    );

    if (!placeExists) {
      throw new NotFoundException(
        `Place with id '${placeId}' not found.`,
      );
    }

    return data.reviews.filter(
      (review: Review) => review.placeId === placeId,
    );
  }

  private updatePlaceRating(
    place: Place,
    reviews: Review[],
  ) {
    const placeReviews = reviews.filter(
      (review) => review.placeId === place.id,
    );

    place.reviewCount = placeReviews.length;

    if (placeReviews.length === 0) {
      place.averageRating = null;
      return;
    }

    const totalRating = placeReviews.reduce(
      (total, review) => total + review.rating,
      0,
    );

    place.averageRating =
      totalRating / placeReviews.length;
  }
}