import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDTO } from 'src/global/dto/register.dto';
import { CredentialsDTO } from 'src/global/dto/credentials.dto';
import { ResponseUserDTO } from 'src/global/dto/response-user.dto';
import { ResponseLoginDTO } from 'src/global/dto/response-login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: ResponseUserDTO,
  })
  async register(@Body() dto: RegisterDTO) {
    return this.service.register(dto);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully authenticated.',
    type: ResponseLoginDTO,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() dto: CredentialsDTO) {
    return this.service.login(dto);
  }
}
