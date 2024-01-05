import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { JwtPayloadDTO } from 'src/global/dto/jwt-payload.dto';
import { TodoAttributesDTO } from 'src/global/dto/todo-attributes.dto';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  async getTodos(user: JwtPayloadDTO) {
    return await this.todoRepo.find({
      where: {
        UserId: user.Id,
        IsDeleted: false,
      },
    });
  }

  async showTodo(Id: number, user: JwtPayloadDTO) {
    const found = await this.todoRepo.findOne({
      where: { Id, UserId: user.Id },
    });
    if (!found) throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    return found;
  }

  async createTodo(dto: TodoAttributesDTO, user: JwtPayloadDTO) {
    const { Task, Completed } = dto;
    const todo: Todo = new Todo();
    todo.Task = Task;
    todo.Completed = Completed;
    todo.UserId = user.Id;
    return await this.todoRepo.save(todo);
  }

  async updateTodo(Id: number, dto: TodoAttributesDTO) {
    const { Task, Completed } = dto;
    const todo = await this.todoRepo.findOne({
      where: { Id },
    });
    todo.Task = Task;
    todo.Completed = Completed;
    return await this.todoRepo.save(todo);
  }

  async deleteTodo(Id: number) {
    const todo = await this.todoRepo.findOne({
      where: { Id },
    });
    if (todo) {
      todo.IsDeleted = true;
      await this.todoRepo.save(todo);
      return true;
    } else return false;
  }
}
