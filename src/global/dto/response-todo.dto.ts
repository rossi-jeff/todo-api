import { ApiProperty } from '@nestjs/swagger';
import { BaseModelDTO } from './base-model.dto';

export class ResponseTodoDTO extends BaseModelDTO {
  @ApiProperty()
  Task: string;

  @ApiProperty()
  Completed: boolean;

  @ApiProperty()
  UserId: number;
}
