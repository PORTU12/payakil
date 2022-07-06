import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: "L'email est requis" })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  password: string;
}
