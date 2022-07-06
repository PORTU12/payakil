import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompanyService } from '../services';
import { RegisterAccountDto } from '../dtos/register-account.dto';
import { Public } from '../../shared/decorators/public.decorator';
import { User } from '../../shared/decorators/user.decorator';
import { CompanyEntity, UserEntity } from '../entities';
import { SocialeRaisonVerificationDto } from '../dtos/sociale-raison-verification.dto';
import { UpdateCompanyDto } from '../dtos/update-company.dto';

@ApiTags('Company')
@Controller('companies')
export class CompanyController {
  private logger = new Logger(CompanyController.name);
  constructor(private companyService: CompanyService) {}

  @Get()
  @ApiOperation({ summary: 'get a company' })
  async getCompany(@User() user: UserEntity) {
    try {
      const company = await this.companyService.getCompany(user?.company.id);
      this.logger.log({
        message: `/Get /companies - Works with success`,
        userId: `${user?.id}`,
        companyId: `${user?.company.id}`,
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
  @Put(':id')
  @ApiOperation({ summary: 'update a company' })
  async updateCompany(
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: UserEntity,
  ) {
    try {
      const company = await this.companyService.updateCompany(
        id,
        updateCompanyDto,
      );
      this.logger.log({
        message: `/Put /companies - Works with success`,
        userId: `${user?.id}`,
        companyId: `${user?.company.id}`,
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
  @Post()
  @Public()
  @ApiOperation({ summary: 'creating a new company' })
  async create(@Body() registerAccountDto: RegisterAccountDto) {
    try {
      const company = await this.companyService.create(registerAccountDto);
      this.logger.log({
        message: `/Post /companies - Works with success`,
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

  @Get('/transactions')
  @ApiOperation({ summary: 'get all transactions of one company' })
  @ApiOkResponse({
    description: 'This endpoint return all transactions of one company',
  })
  async getAllTransactionsofCompany(@User() user: UserEntity) {
    try {
      const transactionsByCompany =
        await this.companyService.getAllTransactionsByCompany(
          user?.company?.id,
        );
      this.logger.log({
        message: `/Get /companies/transactions - Works with success`,
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

  @Post('/verify/sociale-raison')
  @ApiOkResponse({
    description: 'This endpoint checks if an raison social already exists',
  })
  @Public()
  async getCompagnyBySocialeRaison(
    @Body() socialeRaisonVerificationDto: SocialeRaisonVerificationDto,
  ) {
    try {
      const response = await this.companyService.verifySocialeRaison(
        socialeRaisonVerificationDto,
      );
      this.logger.log({
        message: `/Post /companies/sociale-raison - Works with success`,
      });
      return response;
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }
}
