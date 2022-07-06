import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class VerifiesPasswordDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'new password est requis' })
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  newPassword: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'old password est requis' })
  oldPassword: string;
}
