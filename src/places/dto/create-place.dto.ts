import { IsArray, IsIn, IsNotEmpty, IsOptional, IsString,} from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

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
  category: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  services?: string[];

  @IsOptional()
  @IsString()
  @IsIn([
    'ACTIVE',
    'TEMPORARILY_CLOSED',
    'INACTIVE',
  ])
  status?: string;
}