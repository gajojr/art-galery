import { IsBoolean, IsString } from 'class-validator';

export class UserDataForFrontendDto {
  @IsString()
  username: string;

  @IsString()
  administrationRole: string;

  @IsBoolean()
  auth: boolean;

  @IsString()
  token: string;

  @IsString()
  appRole: string;
}
