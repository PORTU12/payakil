import { MerchantServiceEntity } from '../entities';
import { getConnection, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MerchantServiceRepository {
  constructor(
    @Inject('MERCHANTSERVICE_REPOSITORY')
    private merchantServiceRepository: Repository<MerchantServiceEntity>,
  ) {}

  async findAllByCompany(id: string): Promise<MerchantServiceEntity[]> {
    const services = await getConnection()
      .createQueryBuilder()
      .select('service')
      .from(MerchantServiceEntity, 'service')
      .innerJoinAndSelect('service.company', 'company')
      .where('company.id = :id', { id: id })
      .getMany();
    return services;
  }

  async findOne(id: string): Promise<MerchantServiceEntity> {
    return await this.merchantServiceRepository.findOne(id);
  }
  async create(service: MerchantServiceEntity): Promise<MerchantServiceEntity> {
    const result = await this.merchantServiceRepository.save(service);
    return result;
  }

  async remove(id: string): Promise<void> {
    await this.merchantServiceRepository.delete(id);
  }
  async update(service: MerchantServiceEntity): Promise<MerchantServiceEntity> {
    return await this.merchantServiceRepository.save(service);
  }
}
