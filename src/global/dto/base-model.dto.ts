import { ApiProperty } from '@nestjs/swagger';

export class BaseModelDTO {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  Created: string;

  @ApiProperty()
  Updated: string;

  @ApiProperty()
  Version: number;

  @ApiProperty()
  IsDeleted: boolean;
}
