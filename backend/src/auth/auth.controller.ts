import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';
import { Express } from 'express';
import { UserDataForFrontendDto } from './dto/user-data-for-frontend.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(FileInterceptor('avatar'))
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserDataForFrontendDto> {
    return this.authService.signUp(authCredentialsDto, file.path);
  }

  @Post('/signin')
  signIn(
    @Body() signInCredentialsDto: SignInCredentialsDto,
  ): Promise<UserDataForFrontendDto> {
    return this.authService.signIn(signInCredentialsDto);
  }

  @Get('/avatar')
  @UseGuards(AuthGuard('jwt'))
  getAvatar(@Query('username') username: string): Promise<string> {
    return this.authService.getAvatar(username);
  }
}
