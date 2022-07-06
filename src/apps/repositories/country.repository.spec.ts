import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Country } from '../entities';
import {
  createConnection,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';

describe('CountryRepository', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let repository: Repository<Country>;

  const mockCountryRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };
  const id = '5ffbfbb9-1cca-417d-9203-dedfb269f261';
  const countryInfo = {
    id,
    name: 'France',
  };

  const DATABASE_TEST_CONNECTION = 'DATABASE_TEST_CONNECTION';
  beforeEach(async () => {
    await createConnection({
      type: 'sqlite',
      database: ':memory:',
      entities: [Country],
      synchronize: true,
      logging: false,
      name: DATABASE_TEST_CONNECTION,
    });
    testingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: getRepositoryToken(Country),
          useValue: mockCountryRepository,
        },
      ],
    }).compile();

    repository = getRepository(Country, DATABASE_TEST_CONNECTION);
    app = testingModule.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await getConnection(DATABASE_TEST_CONNECTION).close();
  });
  it('CountryRepository - should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('Country Repository', () => {
    it('find All countries', async () => {
      await repository.insert(countryInfo);
      const countries = await repository.find();
      expect(countries).toEqual([countryInfo]);
    });
    it('find one country', async () => {
      await repository.insert(countryInfo);
      const country = await repository.findOne(id);
      expect(country).toEqual(countryInfo);
    });
  });
});
