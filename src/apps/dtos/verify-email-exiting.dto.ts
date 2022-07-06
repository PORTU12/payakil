import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifiesEmailExistingDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le token est requis' })
  @IsEmail()
  email: string;
}
