import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CompanyDto } from './company.dto';
import { RegisterUserDto } from './register-user.dto';

export class RegisterAccountDto {
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => CompanyDto)
  company: CompanyDto;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => RegisterUserDto)
  user: RegisterUserDto;
}
