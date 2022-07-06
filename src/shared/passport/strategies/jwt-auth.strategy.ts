import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../../apps/repositories';
import { PayloadInterface } from '../../../apps/interfaces/payload.interface';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtAuthStrategy.name);

  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: PayloadInterface) {
    const { email } = payload;
    if (!email) {
      this.logger.error({ message: "Jeton d'accès invalide." });
      throw new HttpException(
        {
          message: "Jeton d'accès invalide.",
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      this.logger.error({
        message:
          'Pour avoir accès à cette ressource vous devez vous authentifier.',
      });
      throw new HttpException(
        {
          message:
            'Pour avoir accès à cette ressource vous devez vous authentifier.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
