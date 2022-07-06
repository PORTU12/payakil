import { CompanyEntity } from '../entities';
import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CompanyRepository {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  async create(company: CompanyEntity): Promise<CompanyEntity> {
    const companyCreated = await this.companyRepository.save(company);
    return companyCreated;
  }

  async findOneBySocialeRaison(socialeRaison: string) {
    return await this.companyRepository.findOne({ where: { socialeRaison } });
  }

  async findOne(id: string) {
    return await this.companyRepository.findOne({
      where: { id },
      relations: ['country'],
    });
  }
  async findBySocialeRaison(socialeRaison: string) {
    return await this.companyRepository.findOne({ where: { socialeRaison } });
  }

  async update(company: CompanyEntity) {
    return await this.companyRepository.save(company);
  }
}
