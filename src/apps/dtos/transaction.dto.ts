import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @IsNumber()
  @ApiProperty({ type: 'number', description: 'paymentMethodId' })
  paymentMethodId: number;

  @ApiProperty({ type: 'string', description: 'reference' })
  @IsString()
  reference: string;

  @IsNumber()
  @ApiProperty({ type: 'number', description: 'amount' })
  amount: number;

  @IsString()
  @ApiProperty({ type: 'string', description: 'currency' })
  currency: string;

  @IsString()
  @ApiProperty({ type: 'string', description: 'description' })
  @IsNotEmpty({ message: 'description cannot be empty!' })
  description: string;

  @IsString()
  @ApiProperty({ type: 'string', description: 'merchantService' })
  merchantService: string;

  @IsString()
  @ApiProperty({ type: 'string', description: 'notificationUrl' })
  notificationUrl: string;

  @IsString()
  @ApiProperty({ type: 'string', description: 'returnUrl' })
  returnUrl: string;

  @IsString()
  @ApiProperty({ type: 'string', description: 'cancelUrl' })
  cancelUrl: string;

  @IsString()
  @ApiProperty({ type: 'string', description: 'status' })
  status: string;
}
