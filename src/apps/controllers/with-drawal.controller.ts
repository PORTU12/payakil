import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WithdrawalService } from '../services';
import { CashOutDto } from '../dtos/cash-out.dto';
import { User } from 'shared/decorators/user.decorator';
import { UserEntity } from '../entities/user.entity';

@ApiTags('Withdrawal')
@Controller('cash-out')
export class WithdrawalController {
  private readonly logger = new Logger(WithdrawalService.name);

  constructor(private withdrawalService: WithdrawalService) {}

  @Post()
  async cashOut(@Body() cashOutDto: CashOutDto, @User() user: UserEntity) {
    try {
      const response = await this.withdrawalService.cashOut(
        cashOutDto,
        user.company.id,
      );
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

  @Get()
  async getWithdrawals(@User() user: UserEntity) {
    try {
      const withdrawals = await this.withdrawalService.getWithdrawals(
        user.company.id,
      );
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

  @Get(':id')
  async getWithdrawal(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: UserEntity,
  ) {
    try {
      const withdrawal = await this.withdrawalService.getWithdrawal(
        id,
        user.company.id,
      );
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
}