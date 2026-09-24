import { ApiProperty } from '@nestjs/swagger';

export class Review {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Identifiant unique de la revue.',
  })
  id: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Identifiant de la place associée.',
  })
  placeId: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Nom ou pseudonyme de la personne.',
  })
  authorName: string;

  @ApiProperty({
    example: 4,
    minimum: 1,
    maximum: 5,
    description: 'Note attribuée à la place.',
  })
  rating: number;

  @ApiProperty({
    example: 'Endroit propre et bonne ambiance.',
    description: 'Commentaire associé à la note.',
  })
  comment: string;

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