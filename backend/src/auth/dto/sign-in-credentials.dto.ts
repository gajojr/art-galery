import { IsString } from 'class-validator';

export class SignInCredentialsDto {
  @IsString()
  password: string;

  @IsString()
  username: string;
}
