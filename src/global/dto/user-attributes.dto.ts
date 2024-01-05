import { ApiProperty } from '@nestjs/swagger';

export class UserAttributesDTO {
  @ApiProperty()
  UserName: string;

  @ApiProperty()
  Email: string;
}
