import { IsNotEmpty } from 'class-validator';

export class PostDataDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  dateOfMaking: Date;

  @IsNotEmpty()
  documentLocation: string;

  // @IsNotEmpty()
  // numberOfLikes: number;
}
