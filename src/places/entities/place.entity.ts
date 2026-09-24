import { ApiProperty } from '@nestjs/swagger';

export class Place {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Identifiant unique de la place.',
  })
  id: string;

  @ApiProperty({
    example: 'Bibliothèque principale',
    description: 'Nom de la place.',
  })
  name: string;

  @ApiProperty({
    example: 'Espace calme avec plusieurs prises électriques.',
    description: 'Description de la place.',
  })
  description: string;

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
  })
  category: string;

  @ApiProperty({
    example: 'Pavillon A, local A-210',
    description: 'Emplacement de la place.',
  })
  address: string;

  @ApiProperty({
    example: ['WIFI', 'POWER_OUTLETS'],
    description: 'Services offerts par la place.',
  })
  services: string[];

  @ApiProperty({
    example: 'ACTIVE',
    enum: [
      'ACTIVE',
      'TEMPORARILY_CLOSED',
      'INACTIVE',
    ],
  })
  status: string;

  @ApiProperty({
    example: 4.25,
    nullable: true,
    description: 'Note moyenne calculée à partir des revues.',
  })
  averageRating: number | null;

  @ApiProperty({
    example: 12,
    description: 'Nombre de revues associées à la place.',
  })
  reviewCount: number;

  @ApiProperty({
    example: '2026-09-24T18:30:00.000Z',
    format: 'date-time',
  })
  createdAt: string;

  @ApiProperty({
    example: '2026-09-24T18:30:00.000Z',
    format: 'date-time',
  })
  updatedAt: string;
}
