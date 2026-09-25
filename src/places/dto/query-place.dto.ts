import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryPlaceDto {
  @ApiPropertyOptional({
    example: 'LIBRARY',
    enum: [
      'STUDY_SPACE',
      'LIBRARY',
      'FOOD_SERVICE',
      'SPORTS',
      'STUDENT_SERVICE',
      'COMPUTER_LAB',
      'OTHER',
    ],
    description: 'Filtre les places par catégorie.',
  })
  @IsOptional()
  @IsIn([
    'STUDY_SPACE',
    'LIBRARY',
    'FOOD_SERVICE',
    'SPORTS',
    'STUDENT_SERVICE',
    'COMPUTER_LAB',
    'OTHER',
  ])
  category?: string;

  @ApiPropertyOptional({
    example: 1,
    default: 1,
    minimum: 1,
    description: 'Numéro de la page.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 50,
    description: 'Nombre maximal de places retournées par page.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;
}