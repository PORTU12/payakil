import { UserDto } from './../dtos/user.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories';
import { UserEntity } from '../entities/user.entity';
import { RegisterUserDto } from 'apps/dtos/register-user.dto';
import { MailService } from '../../utils/mail/services/mail.service';
import { JwtService } from '@nestjs/jwt';
import { VerifiesPassworRecoverdDto } from '../dtos/verify-password-recover.dto';
import { VerifiesPasswordDto } from '../dtos/verify-password.dto';
import { CreateUserProfil } from '../dtos/create-user-profil.dto';
import { v4 as uuidv4 } from 'uuid';
import { CompanyEntity } from '../entities/company.entity';
import { ValideProfilDto } from '../dtos/valide-profil.dto';
import { Role } from '../../utils/enums/role.enum';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private userRepository: UserRepository,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  create(userdto: UserDto): Promise<UserDto> {
    const userEntity = new UserEntity();

    const user = {
      ...userdto,
    };

    Object.assign(userEntity, user);
    return this.userRepository.create(userEntity);
  }

  public async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  public async getUser(user: string): Promise<UserEntity> {
    const foundUser = await this.userRepository.findOne(user);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }
  public async editUser(userDto: UserDto): Promise<UserEntity> {
    const userEntity = new UserEntity();

    const usertoUpdate = {
      ...userDto,
    };

    Object.assign(userEntity, usertoUpdate);

    return this.userRepository.update(userEntity);
  }
  public async deleteUser(id: string): Promise<void> {
    await this.userRepository.remove(id);
  }

  async register(user: RegisterUserDto) {
    try {
      const { email, lastName, firstName, password } = user;

      const existingUser = await this.getUserByEmail(email);
      if (existingUser) {
        throw new HttpException(
          'The user already exists!',
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = this.jwtService.sign({ pwd: password });
      const userEntity = new UserEntity();
      Object.assign(userEntity, user);

      await this.userRepository.create(userEntity);
      const token = this.jwtService.sign({ email });
      const verificationEmail = {
        fullName: `${lastName} ${firstName}`,
        email,
        token,
      };
      this.mailService.sendVerifyEmail(verificationEmail);
      this.logger.log({
        message: 'Send an email to the user - Works with success',
      });
      return { message: 'A message has been sent to your email' };
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }

  async createUserProfil(
    createUserProfil: CreateUserProfil,
    company: CompanyEntity,
  ) {
    try {
      const { email, lastName, firstName } = createUserProfil;

      const existingUser = await this.getUserByEmail(email);
      if (existingUser) {
        throw new HttpException(
          'The user already exists!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const userEntity = new UserEntity();

      userEntity.role = Role.ROLE_USER;
      const password = uuidv4();
      userEntity.password = this.jwtService.sign({ pwd: password });
      userEntity.company = company;

      Object.assign(userEntity, createUserProfil);
      await this.userRepository.create(userEntity);
      const token = this.jwtService.sign({ email });
      const verificationEmail = {
        fullName: `${lastName} ${firstName}`,
        email,
        token,
        companyName: company.socialeRaison,
      };
      this.mailService.sendEmailToChangePasswordByProfil(verificationEmail);

      this.logger.log({
        message: 'Works with success',
      });
      return {
        message: 'Un message a été envoyé dans votre email pour validation !',
      };
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const existingUser = await this.userRepository.findOneByEmail(email);
      return existingUser;
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }
  async verifyForRecoverySystem(email: string) {
    const existingUser = await this.getUserByEmail(email);

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

  async recoverPassword(
    token: string,
    verifiesPassworRecoverdDto: VerifiesPassworRecoverdDto,
  ) {
    try {
      const { password } = verifiesPassworRecoverdDto;
      const decodeToken = this.jwtService.decode(token) as {
        email: string;
      };

      if (!(decodeToken && decodeToken.email)) {
        this.logger.error({
          message: 'Something went wrong during the token check',
        });
        throw new HttpException(
          "Jeton d'accès invalide.",
          HttpStatus.BAD_REQUEST,
        );
      }

      const existingUser = await this.userRepository.findOneByEmail(
        decodeToken.email,
      );
      const userEntity = new UserEntity();

      if (existingUser) {
        const usertoUpdate = {
          ...existingUser,
        };
        usertoUpdate.password = this.jwtService.sign({ pwd: password });

        Object.assign(userEntity, usertoUpdate);
        this.userRepository.update(userEntity);
        return userEntity;
      } else {
        throw new HttpException(
          'No user with such email!',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }

  async valideProfil(valideProfilDto: ValideProfilDto) {
    try {
      const { password, token } = valideProfilDto;
      const decodeToken = this.jwtService.decode(token) as {
        email: string;
      };
      if (!(decodeToken && decodeToken.email)) {
        this.logger.error({
          message: 'Something went wrong during the token check',
        });
        throw new HttpException(
          "Jeton d'accès invalide.",
          HttpStatus.BAD_REQUEST,
        );
      }
      const existingUser = await this.userRepository.findOneByEmail(
        decodeToken.email,
      );

      if (!existingUser) {
        throw new HttpException(
          'No user with such email!',
          HttpStatus.BAD_REQUEST,
        );
      }

      existingUser.password = this.jwtService.sign({ pwd: password });
      existingUser.isEnabled = true;

      await this.userRepository.update(existingUser);
      return 'Your password has been successfully changed !';
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }
  async updatePassword(
    user: UserEntity,
    verifiesPasswordDto: VerifiesPasswordDto,
  ) {
    try {
      const { oldPassword, newPassword } = verifiesPasswordDto;

      const existingUser = await this.userRepository.findOneByEmail(user.email);
      const userEntity = new UserEntity();

      const password = this.jwtService.decode(existingUser.password) as {
        pwd: string;
      };

      if (oldPassword === password.pwd) {
        const usertoUpdate = {
          ...existingUser,
        };
        usertoUpdate.password = this.jwtService.sign({ pwd: newPassword });

        Object.assign(userEntity, usertoUpdate);
        this.userRepository.update(userEntity);
        return userEntity;
      } else {
        return 'wrong old password !!!!';
      }
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }
}
