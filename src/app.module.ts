import { Module } from '@nestjs/common';
import DatabaseConfig from './database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DatabaseConfig()),
    AuthModule,
    TodoModule,
  ],
})
export class AppModule {}
