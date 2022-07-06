import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CountryRepository } from '../repositories';
import { CountryService } from './country.service';

describe('CountryService', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let service: CountryService;
  let repository: CountryRepository;

  const mockCountryService = {
    getCountries: jest.fn(),
    getCountry: jest.fn(),
  };
  const mockCountryRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        CountryRepository,
        {
          provide: CountryService,
          useValue: mockCountryService,
        },
      ],
    })
      .overrideProvider(CountryRepository)
      .useValue(mockCountryRepository)
      .compile();
    app = testingModule.createNestApplication();
    service = app.get<CountryService>(CountryService);
    repository = app.get<CountryRepository>(CountryRepository);
    await app.init();
  });

  it('CountryService - should be defined', () => {
    expect(service).toBeDefined();
  });
  it('CountryRepository - should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('Country service', () => {
    it('getCountries', async () => {
      const findAllSpy = jest.spyOn(service, 'getCountries');
      expect(await service.getCountries()).toEqual(undefined);
      expect(findAllSpy).toHaveBeenCalled();
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });

    it('getCountry', async () => {
      const id = '5ffbfbb9-1cca-417d-9203-dedfb269f261';

      const findOneSpy = jest.spyOn(service, 'getCountry');

      expect(await service.getCountry(id)).toEqual(undefined);
      expect(findOneSpy).toHaveBeenCalled();
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(id);
    });
  });
});
