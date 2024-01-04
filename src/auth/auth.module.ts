import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

const secret = process.env.JWT_SECRET || 'Su93r53cre7!';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({ secret })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
