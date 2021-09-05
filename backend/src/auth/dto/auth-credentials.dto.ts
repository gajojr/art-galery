import { IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsString()
  app_role: string;

  @IsString()
  email: string;
}
