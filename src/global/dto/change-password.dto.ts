import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDTO {
  @ApiProperty()
  OldPassWord: string;

  @ApiProperty()
  NewPassWord: string;

  @ApiProperty()
  Confirmation: string;
}
