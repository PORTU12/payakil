import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { WithdrawalRepository } from '../repositories/with-drawal.repository';
import { MobileMoneyType } from '../../utils/enums/mobile-money-type.enum';
import { OptionsOperations } from '../../utils/enums/options-operations.enum';
import { CashOutDto } from '../dtos/cash-out.dto';
import { CompanyService } from './company.service';
import { WithdrawalEntity } from '../entities';

@Injectable()
export class WithdrawalService {
  private readonly logger = new Logger(WithdrawalService.name);

  constructor(
    private companyService: CompanyService,
    private withdrawalRepository: WithdrawalRepository,
  ) {}

  private async moneyTransfers(
    number: string,
    amount: number,
    type: MobileMoneyType,
  ) {
    const moneyTransfersByOrangeApi = async (number, amount) => {
      return await this.moneyTransfersByOrangeApi(number, amount);
    };
    const moneyTransfersByMoovApi = async (number, amount) => {
      return await this.moneyTransfersByMoovApi(number, amount);
    };
    const moneyTransfersByMtnApi = async (number, amount) => {
      return await this.moneyTransfersByMtnApi(number, amount);
    };
    const handlers = {
      ORANGE: moneyTransfersByOrangeApi,
      MOOV: moneyTransfersByMoovApi,
      MTN: moneyTransfersByMtnApi,
    };

    const handler = handlers[type];
    if (!handler) {
      throw new HttpException('Type is not recognized', HttpStatus.BAD_REQUEST);
    }
    return await handler(number, amount);
  }
  private async moneyTransfersByOrangeApi(number: string, amount: number) {
    return {
      message: `Your transfers of ${amount} have been successfully completed!`,
    };
  }
  private async moneyTransfersByMoovApi(number: string, amount: number) {
    return {
      message: `Your transfers of ${amount} have been successfully completed!`,
    };
  }
  private async moneyTransfersByMtnApi(number: string, amount: number) {
    return {
      message: `Your transfers of ${amount} have been successfully completed!`,
    };
  }

  private async cashOutByMobileMoney(
    cashOutDto: CashOutDto,
    companyId: string,
  ) {
    try {
      const response = await this.verifyAvailableFunds(cashOutDto, companyId);
      this.logger.log({
        message: 'Works with success',
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

  private async verifyAvailableFunds(
    cashOutDto: CashOutDto,
    companyId: string,
  ) {
    const { amount, number, mobileMoneyType } = cashOutDto;
    const company = await this.companyService.getCompany(companyId);
    const requestingDate = new Date().toISOString();
    const currency = 'XOF';
    if (company.amount < amount) {
      await this.withdrawalRepository.create({
        amount,
        number,
        status: 'FAIL',
        typeOperations: mobileMoneyType,
        requestingDate,
        company,
        currency,
      } as WithdrawalEntity);
      throw new HttpException(
        { message: 'insufficient funds !' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = this.moneyTransfers(number, amount, mobileMoneyType);
    company.amount -= amount;
    await this.companyService.update(company);
    const processingDate = new Date().toISOString();
    await this.withdrawalRepository.create({
      amount,
      number,
      status: 'SUCCESS',
      typeOperations: mobileMoneyType,
      processingDate,
      requestingDate,
      company,
      currency,
    } as WithdrawalEntity);
    return response;
  }
  async cashOut(cashOutDto: CashOutDto, companyId: string) {
    try {
      const { optionsOperations } = cashOutDto;
      let response;
      if (optionsOperations === OptionsOperations.MOBILE_MONEY) {
        response = await this.cashOutByMobileMoney(cashOutDto, companyId);
        this.logger.log({
          message: 'Works with success',
        });
      }
      this.logger.log({
        message: 'Works with success',
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

  async getWithdrawal(id: string, companyId: string) {
    try {
      const withdrawal = await this.withdrawalRepository.findOne(id, companyId);

      this.logger.log({
        message: 'Works with success',
      });
      return withdrawal;
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }
  async getWithdrawals(companyId: string) {
    try {
      const withdrawals = await this.withdrawalRepository.findAll(companyId);

      this.logger.log({
        message: 'Works with success',
      });
      return withdrawals;
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }
}
