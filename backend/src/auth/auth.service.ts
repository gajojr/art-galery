import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserDataForFrontendDto } from './dto/user-data-for-frontend.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
    filePath: string,
  ): Promise<UserDataForFrontendDto> {
    const payload: JwtPayload = { username: authCredentialsDto.username };
    const accessToken: string = this.jwtService.sign(payload);
    return this.usersRepository.createUser(
      authCredentialsDto,
      filePath,
      accessToken,
    );
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<UserDataForFrontendDto> {
    const { username, password } = signInCredentialsDto;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);
      return {
        username,
        administrationRole: user.administrationRole,
        auth: true,
        token: accessToken,
        appRole: user.appRole,
      };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  getAvatar(username: string): Promise<string> {
    return this.usersRepository.getAvatarUrl(username);
  }
}
