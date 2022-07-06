import { CompanyEntity } from './../entities/company.entity';
import { MerchantServiceEntity } from './../entities/merchant-service.entity';
import { MerchantServiceService } from './../services/merchant-service.service';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { MerchantServiceController } from './merchant-service.controller';
import { CreateMerchantServiceDto } from './../dtos/merchant-service.dto';

describe('merchant-service-Controller', () => {
  let app: INestApplication;
  let serviceController: MerchantServiceController;
  let merchantserviceservice: MerchantServiceService;

  const mockService = {
    getAll: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [],
      controllers: [MerchantServiceController],
      providers: [
        {
          provide: MerchantServiceService,
          useValue: mockService,
        },
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    serviceController = app.get<MerchantServiceController>(
      MerchantServiceController,
    );
    merchantserviceservice = app.get<MerchantServiceService>(
      MerchantServiceService,
    );
    await app.init();
  });
  it('serviceController - should be defined', () => {
    expect(serviceController).toBeDefined();
  });
  it('merchantserviceservice - should be defined', () => {
    expect(merchantserviceservice).toBeDefined();
  });

  describe('get one Service', () => {
    it('should return an entity of service if successful', async () => {
      const expectedResult = new MerchantServiceEntity();
      const mockNumberToSatisfyParameters = '';
      jest
        .spyOn(serviceController, 'getServicebyId')
        .mockResolvedValue(expectedResult);
      expect(
        await serviceController.getServicebyId(mockNumberToSatisfyParameters),
      ).toBe(expectedResult);
    });
  });
  describe('get all services by company', () => {
    const company = new CompanyEntity();
    it('should return all services if successful', async () => {
      const expectedResult = [];
      jest
        .spyOn(serviceController, 'getAllMerchantService')
        .mockResolvedValue(expectedResult);
      expect(await serviceController.getAllMerchantService(company.id)).toBe(
        expectedResult,
      );
    });
  });

  describe('Create Service ', () => {
    const dto = new CreateMerchantServiceDto();
    it('should return an object of services entity when created', async () => {
      const expectedResult = new MerchantServiceEntity();
      jest
        .spyOn(serviceController, 'CreateService')
        .mockResolvedValue(expectedResult);
      expect(await serviceController.CreateService(dto, null)).toBe(
        expectedResult,
      );
    });
  });

  describe('update Service', () => {
    it('should update a Service if successful', async () => {
      const expectedResult = new MerchantServiceEntity();
      const mockNumberToSatisfyParameters = new CreateMerchantServiceDto();
      jest
        .spyOn(serviceController, 'editservice')
        .mockResolvedValue(expectedResult);
      expect(
        await serviceController.editservice(mockNumberToSatisfyParameters),
      ).toBe(expectedResult);
    });
  });
  describe('delete Service', () => {
    it('should delete a Service if successful', async () => {
      const expectedResult: any = async (id: string): Promise<void> => {
        serviceController.getServicebyId(id);
      };
      const mockNumberToSatisfyParameters = new MerchantServiceEntity();
      jest
        .spyOn(serviceController, 'deleteService')
        .mockResolvedValue(expectedResult);
      expect(
        await serviceController.deleteService(mockNumberToSatisfyParameters.id),
      ).toBe(expectedResult);
    });
  });
});
