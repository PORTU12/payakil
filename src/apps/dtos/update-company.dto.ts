import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @ApiProperty()
  socialeRaison: string;

  @ApiProperty()
  sectorOfActivity: string;

  @ApiProperty()
  registerOfCommerce: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  countryId: string;
}
