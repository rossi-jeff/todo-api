import { ApiProperty } from '@nestjs/swagger';

export class ResponseLoginDTO {
  @ApiProperty()
  UserName: string;

  @ApiProperty()
  Token: string;
}
