import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMerchantServiceDto {
  @IsNotEmpty({ message: 'Le Libellé est requis' })
  @ApiProperty({ type: 'string', description: 'label' })
  label: string;

  @ApiProperty({ type: 'string', description: 'logo' })
  logo: string;
}
