import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SocialeRaisonVerificationDto } from '../dtos/sociale-raison-verification.dto';
import { RegisterAccountDto } from '../dtos/register-account.dto';
import { CompanyEntity } from '../entities';
import { CompanyRepository, CountryRepository } from '../repositories';
import { CountryService } from './country.service';
import { TransactionService } from './transaction.service';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from '../../utils/enums/role.enum';
import { UpdateCompanyDto } from 'apps/dtos/update-company.dto';

@Injectable()
export class CompanyService {
  private logger = new Logger();
  constructor(
    private readonly companyRepository: CompanyRepository,
    private userService: UserService,
    private countryService: CountryService,
    private transactionService: TransactionService,
    private configService: ConfigService,
    private countryRepository: CountryRepository,
  ) {}

  async create(account: RegisterAccountDto) {
    try {
      const { company, user } = account;
      const { countryId, socialeRaison } = company;
      const { email } = user;

      const existingCompany =
        await this.companyRepository.findOneBySocialeRaison(socialeRaison);

      if (existingCompany) {
        throw new HttpException(
          'This sociale raison already exists !',
          HttpStatus.BAD_REQUEST,
        );
      }
      const existingUser = await this.userService.getUserByEmail(email);
      if (existingUser) {
        throw new HttpException(
          'The user already exists !',
          HttpStatus.BAD_REQUEST,
        );
      }

      const country = await this.countryService.getCountry(countryId);
      if (!country) {
        throw new HttpException(
          'The country does not exist !',
          HttpStatus.NOT_FOUND,
        );
      }
      const companyEntity = new CompanyEntity();
      Object.assign(companyEntity, company);
      companyEntity.country = country;
      const companyCreated = await this.companyRepository.create(companyEntity);
      const userToCreated = {
        ...user,
        role: Role.ROLE_ADMIN,
        company: companyCreated,
      };
      await this.userService.register(userToCreated);
      const jwtService = new JwtService({
        secret: this.configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '2m',
        },
      });
      const token = jwtService.sign({ email });
      return {
        message: 'Un message a été envoyé dans votre e-mail pour validation !',
        token,
      };
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }

  async getAllTransactionsByCompany(id: string) {
    try {
      const transactionsByCompany =
        await this.transactionService.getAllTransactionsByCompany(id);
      this.logger.log({
        message: 'Works with success',
      });
      return transactionsByCompany;
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }

  async verifySocialeRaison(
    socialeRaisonVerificationDto: SocialeRaisonVerificationDto,
  ) {
    try {
      const { socialeRaison } = socialeRaisonVerificationDto;
      const company = await this.companyRepository.findBySocialeRaison(
        socialeRaison,
      );
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

  async getCompany(id: string) {
    try {
      const company = await this.companyRepository.findOne(id);
      this.logger.log({
        message: 'Works with success',
      });
      return company;
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }
  async update(company: CompanyEntity) {
    try {
      const companyUpdated = await this.companyRepository.update(company);
      this.logger.log({
        message: 'Works with success',
      });
      return companyUpdated;
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }

  async updateCompany(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      const company = await this.getCompany(id);

      if (!company) {
        throw new HttpException(
          'This company does not exist !',
          HttpStatus.BAD_REQUEST,
        );
      }
      const { socialeRaison, countryId } = updateCompanyDto;
      const response = await this.companyRepository.findOneBySocialeRaison(
        socialeRaison,
      );
      if (company.socialeRaison !== socialeRaison && response) {
        throw new HttpException(
          'A company already exists with this name !',
          HttpStatus.BAD_REQUEST,
        );
      }

      const country = await this.countryRepository.findOne(countryId);
      if (!country) {
        throw new HttpException(
          'The country does not exist !',
          HttpStatus.NOT_FOUND,
        );
      }

      Object.assign(company, updateCompanyDto);

      const companyUpdated = await this.companyRepository.update(company);
      this.logger.log({
        message: 'Works with success',
      });
      return companyUpdated;
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }
}
