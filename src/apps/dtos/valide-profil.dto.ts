import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class ValideProfilDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le token est requis' })
  token: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'le password est requis' })
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
