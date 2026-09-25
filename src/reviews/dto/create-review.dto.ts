import { IsInt, IsNotEmpty, IsString, Max, Min} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
  example: '00000-0000000000000-0000000',
  description: 'ID de la place à laquelle il y a le review',
  })
  @IsString()
  @IsNotEmpty()
  placeId: string;
  @ApiProperty({
  example: 'John Doe',
  description: 'Non de la personne qui laisse le review',
  })
  @IsString()
  @IsNotEmpty()
  authorName: string;
  @ApiProperty({
  example: 3,
  description: 'Nombre d\'étoiles entre 1-5',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
  @ApiProperty({
  example: 'Propre  et bonne ambiance',
  description: 'Explication du nombre d\'étoiles',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
}