import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto.js';
import { UpdatePlaceDto } from './dto/update-place.dto.js';
import { JsonRepository } from '../common/persistence/json.repository.js';
import { randomUUID } from 'node:crypto';
import { Place } from './entities/place.entity.js';
import { QueryPlaceDto } from './dto/query-place.dto.js';

@Injectable()
export class PlacesService {
  constructor(private readonly jsonRepository: JsonRepository,){}

  async create(createPlaceDto: CreatePlaceDto) {
    const data = await this.jsonRepository.readData();


    const place = {
    id: randomUUID(),
    ...createPlaceDto,
    averageRating: null,
    reviewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    };

    data.places.push(place);

    await this.jsonRepository.writeData(data);

    return place;
  }

  async findAll(query: QueryPlaceDto) {
    const data = await this.jsonRepository.readData();

    let places = data.places;

    if (query.category) {
      places = places.filter(
        (place: Place) => place.category === query.category,
      );
    }

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const totalItems = places.length;
    const totalPages = Math.ceil(totalItems / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedPlaces = places.slice(
      startIndex,
      endIndex,
    );

    return {
      data: paginatedPlaces,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    };
  }

  async findOne(id: string) {
    const data = await this.jsonRepository.readData();
    const place = data.places.find((place: Place) => place.id === id,);
    if (!place) {
      throw new NotFoundException(`Place with id '${id}' not found.`);
    }

    return place;
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto) {
    const data = await this.jsonRepository.readData();
    const place = data.places.find((place: Place) => place.id === id,);
    if (!place) {
      throw new NotFoundException(
        `Place with id '${id}' not found.`,
      );
    }
    Object.assign(place, updatePlaceDto);
    place.updatedAt = new Date().toISOString();
    await this.jsonRepository.writeData(data);
    return place;
  }

  async remove(id: string) {
    const data = await this.jsonRepository.readData();

    const placeIndex = data.places.findIndex((place: Place) => place.id === id,);

    if (placeIndex === -1) {
      throw new NotFoundException(`Place with id '${id}' not found.`,);
    }

    const place = data.places.find((place: Place) => place.id === id,);

    if (place.reviewCount <= 0){
      throw new ConflictException('Cannot delete a place that has reviews.',);
    }

    const [deletedPlace] = data.places.splice(placeIndex, 1);

    await this.jsonRepository.writeData(data);

    return deletedPlace;
  }
}
