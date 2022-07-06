import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SocialeRaisonVerificationDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'La raison social est requise' })
  socialeRaison: string;
}
