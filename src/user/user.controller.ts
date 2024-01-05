import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserAttributesDTO } from '../global/dto/user-attributes.dto';
import { ChangePasswordDTO } from '../global/dto/change-password.dto';
import { AuthGuard } from '../auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseUserDTO } from '../global/dto/response-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of current users',
    type: [ResponseUserDTO],
  })
  async getUsers() {
    return await this.service.getUsers();
  }

  @Get('current')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get logged in user',
    type: ResponseUserDTO,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCurrentUser(@Req() req) {
    return await this.service.getCurrentUser(req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get a user by id',
    type: ResponseUserDTO,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserById(@Param('id') id: string, @Req() req) {
    if (id != req.user.Id)
      throw new HttpException(
        'You must view logged in user',
        HttpStatus.UNAUTHORIZED,
      );
    return await this.service.getUserById(parseInt(id));
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Update a user by id',
    type: ResponseUserDTO,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UserAttributesDTO,
    @Req() req,
  ) {
    if (id != req.user.Id)
      throw new HttpException(
        'You must update logged in user',
        HttpStatus.UNAUTHORIZED,
      );
    return await this.service.updateUser(parseInt(id), dto);
  }

  @Patch('change')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: "Change a user's password",
    type: ResponseUserDTO,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changeUserPassword(@Body() dto: ChangePasswordDTO, @Req() req) {
    return await this.service.changeUserPassword(dto, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'Delete a user by id',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteUser(
    @Param('id') id: string,
    @Req() req,
    @Res() response: Response,
  ) {
    if (id != req.user.Id)
      throw new HttpException(
        'You must delete logged in user',
        HttpStatus.UNAUTHORIZED,
      );
    await this.service.deleteUser(parseInt(id));
    response.status(HttpStatus.NO_CONTENT).send();
  }
}
