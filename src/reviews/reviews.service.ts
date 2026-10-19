import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'node:crypto';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { Place, PlaceDocument } from '../places/schemas/place.schema.js';
import { Review, ReviewDocument } from './schemas/review.schema.js';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Place.name)
    private readonly placeModel: Model<PlaceDocument>,
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const place = await this.placeModel.findOne({ id: createReviewDto.placeId });

    if (!place) {
      throw new NotFoundException(`Place with id '${createReviewDto.placeId}' not found.`);
    }

    const createdReview = await this.reviewModel.create({
      id: randomUUID(),
      ...createReviewDto,
    });

    await this.syncPlaceStats(createReviewDto.placeId);

    return createdReview.toJSON();
  }

  async findAll() {
    return this.reviewModel.find().sort({ createdAt: -1 }).lean();
  }

  async findOne(id: string) {
    const review = await this.reviewModel.findOne({ id });

    if (!review) {
      throw new NotFoundException(`Review with id '${id}' not found.`);
    }

    return review.toJSON();
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewModel.findOne({ id });

    if (!review) {
      throw new NotFoundException(`Review with id '${id}' not found.`);
    }

    const updatedReview = await this.reviewModel.findOneAndUpdate(
      { id },
      { $set: updateReviewDto },
      { new: true },
    );

    if (!updatedReview) {
      throw new NotFoundException(`Review with id '${id}' not found.`);
    }

    await this.syncPlaceStats(updatedReview.placeId);

    return updatedReview.toJSON();
  }

  async remove(id: string) {
    const review = await this.reviewModel.findOne({ id });

    if (!review) {
      throw new NotFoundException(`Review with id '${id}' not found.`);
    }

    const deletedReview = await this.reviewModel.findOneAndDelete({ id });

    if (!deletedReview) {
      throw new NotFoundException(`Review with id '${id}' not found.`);
    }

    await this.syncPlaceStats(deletedReview.placeId);

    return deletedReview.toJSON();
  }

  async findByPlace(placeId: string) {
    const place = await this.placeModel.findOne({ id: placeId });

    if (!place) {
      throw new NotFoundException(`Place with id '${placeId}' not found.`);
    }

    return this.reviewModel.find({ placeId }).sort({ createdAt: -1 }).lean();
  }

  private async syncPlaceStats(placeId: string) {
    const [reviewStats] = await this.reviewModel.aggregate([
      { $match: { placeId } },
      {
        $group: {
          _id: '$placeId',
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    const place = await this.placeModel.findOne({ id: placeId });

    if (!place) {
      return;
    }

    if (!reviewStats) {
      place.averageRating = null;
      place.reviewCount = 0;
      await place.save();
      return;
    }

    place.averageRating = reviewStats.averageRating ?? null;
    place.reviewCount = reviewStats.reviewCount ?? 0;
    await place.save();
  }
}