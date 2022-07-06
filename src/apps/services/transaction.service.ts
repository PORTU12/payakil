import { CreateTransactionDto } from '../dtos/transaction.dto';
import { OperationType } from '../../utils/enums/operation-type';
import { TransactionEntity } from '../entities';
import { Injectable } from '@nestjs/common';
import { MerchantServiceService } from './merchant-service.service';
import { TransactionRepository } from '../repositories';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly merchantServiceService: MerchantServiceService,
  ) {}
  async getAllTransactionsByCompany(idCompany: string) {
    const transactions =
      await this.transactionRepository.getAllTransctionsByCompany(idCompany);
    return transactions;
  }
  async cashIn(createtransactiondto: CreateTransactionDto) {
    const transactionEntity = new TransactionEntity();

    const transaction = {
      ...createtransactiondto,
      typeOperation: OperationType.CASHIN,
    };

    Object.assign(transactionEntity, transaction);

    const transactionCreated = await this.transactionRepository.create(
      transactionEntity,
    );
    const service = transaction.merchantService;
    const serviceCreated = await this.merchantServiceService.getMerchantService(
      service,
    );
    return Object.assign(transactionCreated, serviceCreated);
  }
}
