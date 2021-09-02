import { IsOptional, IsString } from 'class-validator';

export class GetPostsFilterDto {
  @IsOptional()
  category?: string;

  @IsOptional()
  @IsString()
  order_by?: string;
}
