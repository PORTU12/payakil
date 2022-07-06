import { MerchantServiceEntity } from './../entities/merchant-service.entity';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateMerchantServiceDto } from '../dtos/merchant-service.dto';
import { CompanyRepository, MerchantServiceRepository } from '../repositories';
import { v4 as uuidv4 } from 'uuid';
import { IArgsCreateMerchantService } from '../interfaces/agrs-create-merchant-service.interface';

@Injectable()
export class MerchantServiceService {
  private logger = new Logger(MerchantServiceService.name);
  constructor(
    private readonly merchantServiceRepository: MerchantServiceRepository,
    private companyRepository: CompanyRepository,
  ) {}

  async getAllMerchantServiceByCompany(id: string) {
    const merchantServices =
      await this.merchantServiceRepository.findAllByCompany(id);
    return merchantServices;
  }

  async getMerchantService(id: string) {
    const merchantService = await this.merchantServiceRepository.findOne(id);
    if (!merchantService) {
      throw new HttpException(
        'The merchant does not exist !',
        HttpStatus.NOT_FOUND,
      );
    }
    return merchantService;
  }

  async create(args: IArgsCreateMerchantService) {
    try {
      const { createMerchantServiceDto, companyId } = args;
      const company = await this.companyRepository.findOne(companyId);

      const merchantServiceEntity = new MerchantServiceEntity();
      Object.assign(merchantServiceEntity, createMerchantServiceDto);
      merchantServiceEntity.company = company;
      merchantServiceEntity.clientSecret = uuidv4();
      const merchantServiceCreated =
        await this.merchantServiceRepository.create(merchantServiceEntity);
      this.logger.log({
        message: 'Works with success',
      });
      return merchantServiceCreated;
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }

  public async editService(
    serviceDto: CreateMerchantServiceDto,
  ): Promise<MerchantServiceEntity> {
    const merchantServiceEntity = new MerchantServiceEntity();

    const servicetoUpdate = {
      ...serviceDto,
    };

    Object.assign(merchantServiceEntity, servicetoUpdate);

    return this.merchantServiceRepository.update(merchantServiceEntity);
  }
  public async deleteService(id: string): Promise<void> {
    await this.merchantServiceRepository.remove(id);
  }
}
