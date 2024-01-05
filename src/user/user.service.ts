import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { UserAttributesDTO } from '../global/dto/user-attributes.dto';
import { ChangePasswordDTO } from '../global/dto/change-password.dto';
import { JwtPayloadDTO } from '../global/dto/jwt-payload.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async getUsers() {
    return await this.userRepo.find({
      where: { IsDeleted: false },
    });
  }

  async getCurrentUser(user: JwtPayloadDTO) {
    return this.getUserById(user.Id);
  }

  async getUserById(Id: number) {
    return await this.userRepo.findOne({
      where: { Id },
    });
  }

  async updateUser(Id: number, dto: UserAttributesDTO) {
    const user = await this.getUserById(Id);
    const { UserName, Email } = dto;
    user.UserName = UserName;
    user.Email = Email;
    return await this.userRepo.save(user);
  }

  async changeUserPassword(dto: ChangePasswordDTO, user: JwtPayloadDTO) {
    const { OldPassWord, NewPassWord, Confirmation } = dto;
    const found = await this.userRepo.findOne({
      where: {
        Id: user.Id,
      },
      select: {
        Id: true,
        UserName: true,
        PassWord: true,
        Email: true,
        Random: true,
      },
    });
    if (
      !(found && found.validatePassword(OldPassWord)) ||
      NewPassWord != Confirmation ||
      found.Random
    ) {
      throw new HttpException(
        'Unable to Change Password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    found.setEncryptedPassword(NewPassWord);
    return await this.userRepo.save(found);
  }

  async deleteUser(Id: number) {
    const user = await this.getUserById(Id);
    if (user) {
      user.IsDeleted = true;
      await this.userRepo.save(user);
      return true;
    }
    return false;
  }
}
