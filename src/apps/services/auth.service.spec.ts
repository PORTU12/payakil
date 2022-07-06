import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  loginDto,
  loginStub,
  mockAuthService,
  mockUserRepository,
  resentEmailStub,
  token,
  verifiesEmailDto,
  verifiesEmailStub,
} from '../__mock__/auth-stub';

import { UserRepository } from '../repositories';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let service: AuthService;
  let repository: UserRepository;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserRepository,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    })
      .overrideProvider(UserRepository)
      .useValue(mockUserRepository)
      .compile();
    app = testingModule.createNestApplication();
    service = app.get<AuthService>(AuthService);
    repository = app.get<UserRepository>(UserRepository);
    await app.init();
  });

  it('UserRepository - should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('AuthService - should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('auth service', () => {
    it('login', async () => {
      const loginSpy = jest.spyOn(service, 'login');

      expect(await service.login(loginDto)).toEqual(loginStub);
      expect(loginSpy).toHaveBeenCalled();
      expect(loginSpy).toHaveBeenCalledTimes(1);
      expect(loginSpy).toHaveBeenCalledWith(loginDto);
    });

    it('verifiesEmail', async () => {
      const verifiesEmailSpy = jest.spyOn(service, 'verifiesEmail');

      expect(await service.verifiesEmail(token)).toEqual(verifiesEmailStub);
      expect(verifiesEmailSpy).toHaveBeenCalled();
      expect(verifiesEmailSpy).toHaveBeenCalledTimes(1);
      expect(verifiesEmailSpy).toHaveBeenCalledWith(token);
    });

    it('resentEmail', async () => {
      const resentEmailSpy = jest.spyOn(service, 'resentEmail');

      expect(await service.resentEmail(verifiesEmailDto)).toEqual(
        resentEmailStub,
      );
      expect(resentEmailSpy).toHaveBeenCalled();
      expect(resentEmailSpy).toHaveBeenCalledTimes(1);
      expect(resentEmailSpy).toHaveBeenCalledWith(verifiesEmailDto);
    });
  });
});
