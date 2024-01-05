import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { JwtService } from '@nestjs/jwt';
import { Todo } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService, JwtService],
  controllers: [TodoController],
})
export class TodoModule {}
