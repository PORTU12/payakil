import { Inject, Injectable } from '@nestjs/common';
import { WithdrawalEntity } from '../entities';
import { Repository } from 'typeorm';
import { WITHDRAWAL_REPOSITORY } from '../../constants/constants';

@Injectable()
export class WithdrawalRepository {
  constructor(
    @Inject(WITHDRAWAL_REPOSITORY)
    private withdrawalRepository: Repository<WithdrawalEntity>,
  ) {}

  async create(Withdrawal: WithdrawalEntity): Promise<WithdrawalEntity> {
    const companyCreated = await this.withdrawalRepository.save(Withdrawal);
    return companyCreated;
  }

  async findOne(id: string, company: string): Promise<WithdrawalEntity> {
    return await this.withdrawalRepository.findOne({
      where: { id, company },
    });
  }

  async findAll(company: string): Promise<WithdrawalEntity[]> {
    return await this.withdrawalRepository.find({ where: { company } });
  }
}
