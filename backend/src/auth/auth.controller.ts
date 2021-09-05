import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';
import { Express } from 'express';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(FileInterceptor('avatar'))
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    console.log(file);
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInCredentialsDto);
  }
}
