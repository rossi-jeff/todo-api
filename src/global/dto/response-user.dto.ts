import { ApiProperty } from '@nestjs/swagger';
import { BaseModelDTO } from './base-model.dto';

export class ResponseUserDTO extends BaseModelDTO {
  @ApiProperty()
  UserName: string;

  @ApiProperty()
  Email: string;
}
