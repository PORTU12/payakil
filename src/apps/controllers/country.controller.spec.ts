import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CountryService } from '../services';
import * as request from 'supertest';
import { CountryController } from './country.controller';

describe('CountryController', () => {
  let app: INestApplication;
  let countryController: CountryController;
  let countryService: CountryService;

  const mockCountryService = {
    getCountries: jest.fn(),
    getCountry: jest.fn(),
  };
  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [],
      controllers: [CountryController],
      providers: [
        {
          provide: CountryService,
          useValue: mockCountryService,
        },
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    countryController = app.get<CountryController>(CountryController);
    countryService = app.get<CountryService>(CountryService);
    await app.init();
  });

  it('CountryController - should be defined', () => {
    expect(countryController).toBeDefined();
  });
  it('CountryService - should be defined', () => {
    expect(countryService).toBeDefined();
  });

  describe('GET return the countries', () => {
    it('/countries (GET) Should return the countries ', async () => {
      await request(app.getHttpServer()).get('/countries').expect(200);
      expect(countryService.getCountries).toHaveBeenCalled();
    });
  });

  describe('GET return a country', () => {
    it('/countries (GET) Should return a country', async () => {
      const id = '5ffbfbb9-1cca-417d-9203-dedfb269f261';
      await request(app.getHttpServer()).get(`/countries/${id}`).expect(200);
      expect(countryService.getCountry).toHaveBeenCalled();
      expect(countryService.getCountry).toHaveBeenCalledWith(id);
    });
  });
});
