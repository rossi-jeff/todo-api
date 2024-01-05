import { ApiProperty } from '@nestjs/swagger';

export class TodoAttributesDTO {
  @ApiProperty()
  Task: string;

  @ApiProperty()
  Completed: boolean;
}
