import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDTO {
  @ApiProperty()
  UserName: string;

  @ApiProperty()
  PassWord: string;
}
