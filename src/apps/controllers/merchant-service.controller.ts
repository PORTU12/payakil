import { MerchantServiceEntity } from './../entities/merchant-service.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMerchantServiceDto } from '../dtos/merchant-service.dto';
import { MerchantServiceService } from '../services';
import { UserEntity } from '../entities';
import { User } from '../../shared/decorators/user.decorator';

@ApiTags('Merchant service')
@Controller('merchant-service')
export class MerchantServiceController {
  private logger = new Logger(MerchantServiceController.name);
  constructor(private merchantServiceService: MerchantServiceService) {}

  @Get('/company/:id')
  @ApiOperation({ summary: 'get All services merchant by company' })
  async getAllMerchantService(@Param('id') id: string) {
    return await this.merchantServiceService.getAllMerchantServiceByCompany(id);
  }

  @Post()
  @ApiOperation({ summary: 'add a new service to a company' })
  async CreateService(
    @Body() createMerchantServiceDto: CreateMerchantServiceDto,
    @User() user: UserEntity,
  ) {
    try {
      const merchantService = await this.merchantServiceService.create({
        createMerchantServiceDto,
        companyId: user?.company?.id,
      });
      this.logger.log({
        message: `/Post /merchant-service - Works with success`,
      });
      return merchantService;
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'getting service by Id' })
  public async getServicebyId(@Param('id') id: string) {
    const merchantService =
      await this.merchantServiceService.getMerchantService(id);
    return merchantService;
  }
  @Put('/:id')
  @ApiOperation({ summary: 'updating an exicting service' })
  public async editservice(
    @Body() updateServiceDto: CreateMerchantServiceDto,
  ): Promise<MerchantServiceEntity> {
    const merchantService = await this.merchantServiceService.editService(
      updateServiceDto,
    );
    return merchantService;
  }
  @Delete('/:id')
  @ApiOperation({ summary: 'deleting an exicting service' })
  public async deleteService(@Param('id') id: string) {
    const merchantService = await this.merchantServiceService.deleteService(id);
    return merchantService;
  }
}