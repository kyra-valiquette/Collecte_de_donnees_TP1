import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto.js';
import { UpdatePlaceDto } from './dto/update-place.dto.js';
import { JsonRepository } from '../common/persistence/json.repository.js';
import { randomUUID } from 'node:crypto';
import { Place } from './entities/place.entity.js';

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

  async findAll() {
    const data = await this.jsonRepository.readData();
    const places = data.places;

    return places;
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

    const [deletedPlace] = data.places.splice(placeIndex, 1);

    await this.jsonRepository.writeData(data);

    return deletedPlace;
  }
}
