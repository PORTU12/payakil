import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty({ type: 'string', description: 'User name' })
  userName?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty({ type: 'string', description: 'User last name' })
  lastName?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({ type: 'string', description: 'User first name' })
  firstName?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({ type: 'string', description: 'User salt' })
  salt?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(20)
  @ApiProperty({ type: 'string', description: 'User phone' })
  phone?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ type: 'string', description: 'User password' })
  password?: string;

  @IsEmail()
  @ApiProperty({ type: 'string', description: 'User email' })
  email?: string;

  @IsBoolean()
  @ApiProperty({ type: 'boolean', description: 'User lock status' })
  locked?: boolean;
}
