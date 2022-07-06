import { CreateMerchantServiceDto } from '../dtos/merchant-service.dto';

export interface IArgsCreateMerchantService {
  createMerchantServiceDto: CreateMerchantServiceDto;
  companyId: string;
}
