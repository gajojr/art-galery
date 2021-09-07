import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: string;
}
