import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDTO } from 'src/global/dto/register.dto';
import { CredentialsDTO } from 'src/global/dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDTO) {
    const { UserName, PassWord, Email } = dto;
    const user: User = new User();
    user.UserName = UserName;
    user.Email = Email;
    user.setEncryptedPassword(PassWord);
    await this.userRepo.save(user);
    return await this.userRepo.findOne({
      where: { Id: user.Id },
    });
  }

  async login(dto: CredentialsDTO) {
    const { UserName, PassWord } = dto;
    const found = await this.userRepo.findOne({
      where: { UserName },
      select: {
        Id: true,
        PassWord: true,
      },
    });
    if (!(found && found.validatePassword(PassWord))) {
      throw new HttpException(
        'Unable to Authenticate',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const { Id } = found;
    const Token = this.jwtService.sign({ Id, UserName });
    return { Token, UserName };
  }
}
