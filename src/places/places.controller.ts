import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlacesService } from './places.service.js';
import { CreatePlaceDto } from './dto/create-place.dto.js';
import { UpdatePlaceDto } from './dto/update-place.dto.js';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Place } from './entities/place.entity.js';

@ApiTags('Places')
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}
  @ApiOperation({ summary: 'Create a place' })
  @ApiResponse({
  status: 201,
  description: 'Place successfully created.',
  type:Place,
  })
  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }

  @ApiOperation({ summary: 'Get all places' })
  @ApiResponse({
  status: 200,
  description: 'Places successfully found.',
  type: [Place],
  })
  @Get()
  findAll() {
    return this.placesService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific place' })
  @ApiResponse({
  status: 200,
  description: 'Place successfully found.',
  type: Place,
  })
  @ApiParam({
    name: 'id',
    description: 'Identifiant unique de la place',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a place' })
  @ApiResponse({
  status: 200,
  description: 'Place successfully updated.',
  type: Place,
  })
  @ApiParam({
    name: 'id',
    description: 'Identifiant unique de la place',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placesService.update(id, updatePlaceDto);
  }

  @ApiOperation({ summary: 'Delete a place' })
  @ApiResponse({
  status: 200,
  description: 'Place successfully deleted.',
  type: Place,
  })
  @ApiParam({
    name: 'id',
    description: 'Identifiant unique de la place',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placesService.remove(id);
  }
}
