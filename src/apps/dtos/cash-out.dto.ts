import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { MobileMoneyType } from '../../utils/enums/mobile-money-type.enum';
import { OptionsOperations } from '../../utils/enums/options-operations.enum';

export class CashOutDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le numéro est requis' })
  number: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le montant est requis' })
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty({ message: "L'option est requise" })
  optionsOperations: OptionsOperations;

  @ApiProperty()
  @IsNotEmpty({ message: "L'option est requise" })
  mobileMoneyType: MobileMoneyType;
}
