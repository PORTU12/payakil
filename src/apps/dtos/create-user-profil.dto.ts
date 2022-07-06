import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserProfil {
  @ApiProperty({ type: 'string', description: 'Profil last name' })
  @IsNotEmpty({ message: 'Le prenom est requis' })
  lastName: string;

  @ApiProperty({ type: 'string', description: 'Profil first name' })
  @IsNotEmpty({ message: 'Le mon est requis' })
  firstName: string;

  @IsEmail()
  @ApiProperty({ type: 'string', description: 'Profil email' })
  @IsNotEmpty({ message: "L'email est requis" })
  email: string;

  @ApiProperty({ type: 'string', description: 'Profil phone' })
  phone?: string;
}
