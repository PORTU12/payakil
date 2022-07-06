import { CreateTransactionDto } from '../dtos/transaction.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from '../services';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('/cashin')
  @ApiOperation({ summary: 'cash in operation' })
  async cashIn(@Body() createtransactiondto: CreateTransactionDto) {
    return await this.transactionService.cashIn(createtransactiondto);
  }
  @Get('/:id')
  @ApiOperation({ summary: 'get all transactions of one company' })
  getAllTransactionsofCompany(@Param('id') id: string) {
    return this.transactionService.getAllTransactionsByCompany(id);
  }
}
