import {
  Controller,
  Get,
  UseGuards,
  Param,
  Body,
  Post,
  Patch,
  Res,
  HttpStatus,
  Delete,
  Req,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { TodoService } from './todo.service';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { TodoAttributesDTO } from 'src/global/dto/todo-attributes.dto';
import { Response } from 'express';
import { ResponseTodoDTO } from '../global/dto/response-todo.dto';

@ApiTags('ToDo')
@Controller('todo')
export class TodoController {
  constructor(private service: TodoService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: "List of current users' todos",
    type: [ResponseTodoDTO],
  })
  async getTodos(@Req() req) {
    return await this.service.getTodos(req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get a todo by id',
    type: ResponseTodoDTO,
  })
  async showTodo(@Param('id') id: string, @Req() req) {
    return await this.service.showTodo(parseInt(id), req.user);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Create a todo',
    type: ResponseTodoDTO,
  })
  async createTodo(@Body() dto: TodoAttributesDTO, @Req() req) {
    return await this.service.createTodo(dto, req.user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Update a todo by id',
    type: ResponseTodoDTO,
  })
  async updateTodo(@Param('id') id: string, @Body() dto: TodoAttributesDTO) {
    return await this.service.updateTodo(parseInt(id), dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'Delete a todo by id',
  })
  async deleteTodo(@Param('id') id: string, @Res() response: Response) {
    await this.service.deleteTodo(parseInt(id));
    response.status(HttpStatus.NO_CONTENT).send();
  }
}
