import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { LoginDto } from '../dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { VerifiesEmailDto } from '../dtos/verify-email-resent.dto';
import { MailService } from '../../utils/mail/services/mail.service';
import { VerifiesEmailExistingDto } from '../dtos/verify-email-exiting.dto';
import { VerifiesEmailRecoverDto } from 'apps/dtos/verify-email-recover.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  private logger = new Logger();

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private mailService: MailService,
    private userservice: UserService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const { email, password } = loginDto;
      const user = await this.userRepository.findOneByEmail(email);

      if (!user) {
        throw new HttpException(
          'This user was not found',
          HttpStatus.NOT_FOUND,
        );
      }
      const compare = user.comparePassword(password);
      if (!compare) {
        throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
      }
      if (user && compare) {
        if (user.isEnabled === false) {
          const token = this.jwtService.sign({ email });
          return {
            message: `Email not verified`,
            token,
            statusCode: HttpStatus.UNAUTHORIZED,
          };
        }
        const jwt = await user.encodeToken(user);

        const realExp = this.jwtService.decode(jwt) as {
          exp: string;
        };
        const exp = realExp.exp as string;
        const { password, ...rest } = user;
        const result = {
          user: rest,
          accessTokenUser: jwt,
          exp,
        };
        this.logger.log({
          message: 'Works with success',
        });
        return result;
      }
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }

  async verifiesEmail(idToken: string) {
    const decodedToken = this.jwtService.decode(idToken) as {
      email: string;
    };
    this.logger.log({
      message: 'Decode the token',
    });
    if (!(decodedToken && decodedToken.email)) {
      this.logger.error({
        message: 'Something went wrong during the token check',
      });
      throw new HttpException(
        "Jeton d'accès invalide.",
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findOneByEmail(decodedToken.email);
    if (!user) {
      throw new HttpException(
        'The user already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.isEnabled = true;

    await this.userRepository.update(user);
    this.logger.log({
      message: 'Verify if the user exists - Works with success',
    });

    return { message: 'Your email has been validated !' };
  }

  async resentEmail(verifiesEmailDto: VerifiesEmailDto) {
    const { token } = verifiesEmailDto;
    const decodedToken = this.jwtService.decode(token) as {
      email: string;
      exp: string;
    };
    this.logger.log({
      message: 'Decode the token',
    });
    if (!(decodedToken && decodedToken.email)) {
      this.logger.error({
        message: 'Something went wrong during the token check',
      });
      throw new HttpException(
        "Jeton d'accès invalide.",
        HttpStatus.BAD_REQUEST,
      );
    }
    const date = new Date().getTime() / 1000;
    if (decodedToken.exp < `${date}`) {
      throw new HttpException(`Token expired`, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneByEmail(decodedToken.email);
    if (!user) {
      throw new HttpException(
        'The user already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { email, lastName, firstName } = user;
    this.logger.log({
      message: 'Verify if the user exists - Works with success',
    });

    const tokenToSend = this.jwtService.sign({ email });
    const verificationEmail = {
      fullName: `${lastName} ${firstName}`,
      email,
      token: tokenToSend,
    };
    this.mailService.sendVerifyEmail(verificationEmail);

    return { message: 'A message has been sent to your email' };
  }

  async verifyEmailExisting(
    verifiesEmailExistingDto: VerifiesEmailExistingDto,
  ) {
    try {
      const { email } = verifiesEmailExistingDto;
      const company = await this.userRepository.findOneByEmail(email);
      if (company) {
        return { success: true, message: 'True' };
      }
      this.logger.log({
        message: 'Works with success',
      });
      return { success: false, message: 'False' };
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }
  async verifyForRecoverySystem(
    verifiesEmailRecoverDto: VerifiesEmailRecoverDto,
  ) {
    const { email } = verifiesEmailRecoverDto;
    const existingUser = await this.userservice.getUserByEmail(email);

    const token = this.jwtService.sign(
      { email: existingUser.email },
      { expiresIn: '20m' },
    );
    if (existingUser) {
      const verificationEmail = {
        fullName: `${existingUser.lastName} ${existingUser.firstName}`,
        email,
        token,
      };
      this.mailService.sendPasswordRecoveryEmail(verificationEmail);
      this.logger.log({
        message: 'Send an email to the user - Works with success',
      });
      return { message: 'A message has been sent to your email', existingUser };
    } else {
      throw new HttpException(
        'No user with such email!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
