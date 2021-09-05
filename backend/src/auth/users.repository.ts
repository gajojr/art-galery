import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserDataForFrontendDto } from './dto/user-data-for-frontend.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(
    authCredentialsDto: AuthCredentialsDto,
    filePath: string,
  ): Promise<UserDataForFrontendDto> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(authCredentialsDto.password, salt);

    const user = this.create({
      ...authCredentialsDto,
      password: hashedPassword,
      administration_role: 'user',
      document_location: filePath,
    });

    try {
      await this.save(user);
      return {
        username: user.username,
        administrationRole: user.administration_role,
        auth: true,
        token: 'temp',
        appRole: user.app_role,
      };
    } catch (err) {
      console.log(err);
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
}
