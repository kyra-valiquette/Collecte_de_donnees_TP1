import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min,} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nouveau nom pour la personne qui laissee le review',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  authorName?: string;
  @ApiProperty({
    example: 3,
    description: 'Nouveau rating entre 1-5 pour le review',
    required: false
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
  @ApiProperty({
    example: 'Bonne ambiance',
    description: 'Nouveau commentaire pour expliquer le nombre d\'étoiles',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  comment?: string;
}