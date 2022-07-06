import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CompanyDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'La raison social est requise' })
  socialeRaison: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le nom est requis' })
  sectorOfActivity: string;

  @ApiProperty()
  registerOfCommerce: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le pays est requis' })
  @IsUUID()
  countryId: string;
}
