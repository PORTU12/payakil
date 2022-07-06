import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifiesEmailRecoverDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'email est requis' })
  email: string;
}
