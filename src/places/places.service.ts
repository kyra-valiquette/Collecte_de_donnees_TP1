import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'node:crypto';
import { Model } from 'mongoose';
import { QueryPlaceDto } from './dto/query-place.dto.js';
import { CreatePlaceDto } from './dto/create-place.dto.js';
import { UpdatePlaceDto } from './dto/update-place.dto.js';
import { Place, PlaceDocument } from './schemas/place.schema.js';
import { Review, ReviewDocument } from '../reviews/schemas/review.schema.js';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Place.name)
    private readonly placeModel: Model<PlaceDocument>,
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async create(createPlaceDto: CreatePlaceDto) {
    const createdPlace = await this.placeModel.create({
      id: randomUUID(),
      ...createPlaceDto,
      averageRating: null,
      reviewCount: 0,
    });

    return createdPlace.toJSON();
  }

  async findAll(query: QueryPlaceDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const filter = query.category ? { category: query.category } : {};

    const [places, totalItems] = await Promise.all([
      this.placeModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.placeModel.countDocuments(filter),
    ]);

    return {
      data: places,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit) || 1,
      },
    };
  }

  async findOne(id: string) {
    const place = await this.placeModel.findOne({ id });

    if (!place) {
      throw new NotFoundException(`Place with id '${id}' not found.`);
    }

    return place.toJSON();
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto) {
    const place = await this.placeModel.findOne({ id });

    if (!place) {
      throw new NotFoundException(`Place with id '${id}' not found.`);
    }

    const updatedPlace = await this.placeModel.findOneAndUpdate(
      { id },
      {
        $set: {
          ...updatePlaceDto,
          updatedAt: new Date(),
        },
      },
      { new: true },
    );

    if (!updatedPlace) {
      throw new NotFoundException(`Place with id '${id}' not found.`);
    }

    return updatedPlace.toJSON();
  }

  async remove(id: string) {
    const place = await this.placeModel.findOne({ id });

    if (!place) {
      throw new NotFoundException(`Place with id '${id}' not found.`);
    }

    const reviewCount = await this.reviewModel.countDocuments({ placeId: id });

    if (reviewCount > 0) {
      throw new ConflictException('Cannot delete a place that has reviews.');
    }

    const deletedPlace = await this.placeModel.findOneAndDelete({ id });

    if (!deletedPlace) {
      throw new NotFoundException(`Place with id '${id}' not found.`);
    }

    return deletedPlace.toJSON();
  }
}