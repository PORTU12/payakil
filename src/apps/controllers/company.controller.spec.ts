import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CompanyService } from '../services';
import * as request from 'supertest';
import { CompanyController } from './company.controller';
import { registerAccountDto } from '../__mock__/register-account-stub';

describe('CompanyController', () => {
  let app: INestApplication;
  let companyController: CompanyController;
  let companyService: CompanyService;

  const mockCompanyService = {
    create: jest.fn(),
    getAllTransactionsByCompany: jest.fn(),
  };
  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [],
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: mockCompanyService,
        },
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    companyController = app.get<CompanyController>(CompanyController);
    companyService = app.get<CompanyService>(CompanyService);
    await app.init();
  });

  it('CompanyController - should be defined', () => {
    expect(companyController).toBeDefined();
  });
  it('CompanyService - should be defined', () => {
    expect(companyService).toBeDefined();
  });

  describe('POST create a company and user', () => {
    it('/companies (POST) should create a company and user', async () => {
      await request(app.getHttpServer())
        .post('/companies')
        .send(registerAccountDto)
        .expect(201);
      expect(companyService.create).toHaveBeenCalled();
      expect(companyService.create).toHaveBeenCalledWith(registerAccountDto);
    });
  });

  describe('GET all transactions by company', () => {
    it('/companies/transactions (GET) should return transactions by company', async () => {
      await request(app.getHttpServer())
        .get('/companies/transactions')
        .expect(200);
      expect(companyService.getAllTransactionsByCompany).toHaveBeenCalled();
      expect(companyService.getAllTransactionsByCompany).toHaveBeenCalledWith(
        undefined,
      );
    });
  });
});
