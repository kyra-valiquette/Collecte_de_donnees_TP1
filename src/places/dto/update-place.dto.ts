import { ArrayUnique, IsArray, IsIn, IsNotEmpty, IsOptional, IsString,} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlaceDto {
  @ApiProperty({
      example: 'Hotel Transylvanie',
      description: 'Nom de la place updated',
      required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
  @ApiProperty({
    example: 'Hotel pour les monstres',
    description: 'Description de la place updated',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
  @ApiProperty({
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
    description: 'Catégorie de la place',
    required: false
  })
  @IsOptional()
  @IsString()
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
  @ApiProperty({
      example: '1008 7e avenue',
      description: 'Adresse de la place',
      required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;
  @ApiProperty({
    example: ['WIFI', 'NOURRITURE'],
    description: 'Liste de services offerts par la place',
    required: false,
  })
  @ArrayUnique()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  services?: string[];
  @ApiProperty({
    example: 'ACTIVE',
    enum: [
      'ACTIVE',
      'TEMPORARILY_CLOSED',
      'INACTIVE',
    ],
    description: 'Si la place est ouverte, fermée, où fermée temporairement.',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn([
    'ACTIVE',
    'TEMPORARILY_CLOSED',
    'INACTIVE',
  ])
  status?: string;
}