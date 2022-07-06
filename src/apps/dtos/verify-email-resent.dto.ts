import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifiesEmailDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le token est requis' })
  token: string;
}
