import { ApiProperty } from '@nestjs/swagger';
import { CredentialsDTO } from './credentials.dto';

export class RegisterDTO extends CredentialsDTO {
  @ApiProperty()
  Email: string;
}
