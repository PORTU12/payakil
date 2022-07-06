import { TransactionEntity } from '../entities';
import { getConnection, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TransactionRepository {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: Repository<TransactionEntity>,
  ) {}

  findAll(): Promise<TransactionEntity[]> {
    return this.transactionRepository.find();
  }

  findOne(id: string): Promise<TransactionEntity> {
    return this.transactionRepository.findOne(id);
  }
  create(transaction: TransactionEntity): Promise<TransactionEntity> {
    return this.transactionRepository.save(transaction);
  }

  async remove(id: string): Promise<void> {
    await this.transactionRepository.delete(id);
  }
  async getAllTransctionsByCompany(idCompany: string) {
    const transactions = await getConnection()
      .createQueryBuilder()
      .select('transaction')
      .from(TransactionEntity, 'transaction')
      .innerJoinAndSelect('transaction.service', 'service')
      .innerJoinAndSelect('service.company', 'company')
      .where('company.id = :id', { id: idCompany })
      .getMany();
    return transactions;
  }
}
