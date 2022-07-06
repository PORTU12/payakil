import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { registerAccountDto } from '../__mock__/register-account-stub';
import { CompanyRepository } from '../repositories';
import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let service: CompanyService;
  let repository: CompanyRepository;

  const mockCompanyService = {
    create: jest.fn(),
  };
  const mockCompanyRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        CompanyRepository,
        {
          provide: CompanyService,
          useValue: mockCompanyService,
        },
      ],
    })
      .overrideProvider(CompanyRepository)
      .useValue(mockCompanyRepository)
      .compile();
    app = testingModule.createNestApplication();
    service = app.get<CompanyService>(CompanyService);
    repository = app.get<CompanyRepository>(CompanyRepository);
    await app.init();
  });

  it('CompanyService - should be defined', () => {
    expect(service).toBeDefined();
  });
  it('CompanyRepository - should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('company service', () => {
    it('create', async () => {
      const createSpy = jest.spyOn(service, 'create');

      expect(await service.create(registerAccountDto)).toEqual(undefined);
      expect(createSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(registerAccountDto);
    });
  });
});
