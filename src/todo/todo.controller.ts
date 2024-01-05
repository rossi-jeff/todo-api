import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  Body,
  Post,
  Patch,
  Res,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { TodoService } from './todo.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TodoAttributesDTO } from 'src/global/dto/todo-attributes.dto';
import { Response } from 'express';

@ApiTags('ToDo')
@Controller('todo')
export class TodoController {
  constructor(private service: TodoService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getTodos(@Request() req) {
    return await this.service.getTodos(req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async showTodo(@Param('id') id: string, @Request() req) {
    return await this.service.showTodo(parseInt(id), req.user);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createTodo(@Body() dto: TodoAttributesDTO, @Request() req) {
    return await this.service.createTodo(dto, req.user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async updateTodo(@Param('id') id: string, @Body() dto: TodoAttributesDTO) {
    return await this.service.updateTodo(parseInt(id), dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async deleteTodo(@Param('id') id: string, @Res() response: Response) {
    await this.service.deleteTodo(parseInt(id));
    response.status(HttpStatus.NO_CONTENT).send();
  }
}
