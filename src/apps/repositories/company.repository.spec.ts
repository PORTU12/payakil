import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyEntity, Country } from '../entities';
import {
  createConnection,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { company } from '../__mock__/company-stub';

describe('CompanyRepository', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let repository: Repository<CompanyEntity>;

  const mockCompanyRepository = {
    save: jest.fn(),
  };

  const DATABASE_TEST_CONNECTION = 'DATABASE_TEST_CONNECTION';
  beforeEach(async () => {
    await createConnection({
      type: 'sqlite',
      database: ':memory:',
      entities: [CompanyEntity, Country],
      synchronize: true,
      logging: false,
      name: DATABASE_TEST_CONNECTION,
    });
    testingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: getRepositoryToken(CompanyEntity),
          useValue: mockCompanyRepository,
        },
      ],
    }).compile();

    repository = getRepository(CompanyEntity, DATABASE_TEST_CONNECTION);
    app = testingModule.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await getConnection(DATABASE_TEST_CONNECTION).close();
  });
  it('CompanyRepository - should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('Company Repository', () => {
    it('create company', async () => {
      const companyToCreated = new CompanyEntity();
      Object.assign(companyToCreated, company);
      const companyCreated = await repository.save(companyToCreated);
      expect(companyToCreated).toEqual(companyCreated);
    });
  });
});
