import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserDataForFrontendDto } from './dto/user-data-for-frontend.dto';
import removeImage from '../utils/deleteFile';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(
    authCredentialsDto: AuthCredentialsDto,
    filePath: string,
    accessToken: string,
  ): Promise<UserDataForFrontendDto> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(authCredentialsDto.password, salt);

    const user = this.create({
      ...authCredentialsDto,
      password: hashedPassword,
      administrationRole: 'user',
      documentLocation: filePath,
    });

    try {
      await this.save(user);

      return {
        username: user.username,
        administrationRole: user.administrationRole,
        auth: true,
        token: accessToken,
        appRole: user.appRole,
      };
    } catch (err) {
      console.log(err);
      // delete avatar since user signup failed
      removeImage(filePath);
      // err.code is a string
      if (err.code === '23505') {
        // duplicate username or email occurred
        // key (field)=value
        const duplicateField = err.detail.slice(
          err.detail.indexOf('(') + 1,
          err.detail.indexOf(')'),
        );

        console.log(duplicateField);

        throw new ConflictException(`${duplicateField} already exists`);
      }
    }
  }

  async getAvatarUrl(username: string): Promise<string> {
    const user = await this.findOne({ where: { username } });
    return user.documentLocation;
  }
}
