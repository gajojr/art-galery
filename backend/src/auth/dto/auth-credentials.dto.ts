import { IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsString()
  appRole: string;

  @IsString()
  email: string;
}
