import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService, UserService } from '../services';
import * as request from 'supertest';
import { AuthController } from './auth.controller';
import {
  loginDto,
  token,
  verifiesEmailDto,
  verifiesEmailExistingDto,
  verifiesPassworRecoverdDto,
  verifiesEmailRecoverDto,
} from '../__mock__/auth-stub';
import { UserEntity } from '../entities';

describe('AuthController', () => {
  let app: INestApplication;
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;

  const mockAuthService = {
    login: jest.fn(),
    verifiesEmail: jest.fn(),
    resentEmail: jest.fn(),
    verifyEmailExisting: jest.fn(),
    verifyForRecoverySystem: jest.fn(),
  };

  const mockUserService = {
    recoverPassword: jest.fn(),
  };
  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
    userService = app.get<UserService>(UserService);
    await app.init();
  });

  it('AuthController - should be defined', () => {
    expect(authController).toBeDefined();
  });
  it('AuthService - should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('POST connect a user', () => {
    it('/login (POST) Should connect a user', async () => {
      await request(app.getHttpServer())
        .post('/login')
        .send(loginDto)
        .expect(201);
      expect(authService.login).toHaveBeenCalled();
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe("PUT verify the user's email", () => {
    it("/verify-email/:token (PUT) Should allow to verify the user's email after clicking on the link sent at registration ", async () => {
      await request(app.getHttpServer())
        .put(`/verify-email/${token}`)
        .expect(200);
      expect(authService.verifiesEmail).toHaveBeenCalled();
      expect(authService.verifiesEmail).toHaveBeenCalledWith(token);
    });
  });

  describe('POST send back a message for validation to the user', () => {
    it('/resent-email (POST) Should send back a message for validation of his email to the user ', async () => {
      await request(app.getHttpServer())
        .post('/resent-email')
        .send(verifiesEmailDto)
        .expect(201);
      expect(authService.resentEmail).toHaveBeenCalled();
      expect(authService.resentEmail).toHaveBeenCalledWith(verifiesEmailDto);
    });
  });
  describe('verify if Email Exists', () => {
    it('should return true if email exists', async () => {
      jest
        .spyOn(authService, 'verifyEmailExisting')
        .mockResolvedValue({ success: true, message: 'Email already exists' });
      expect(await authService.verifyEmailExisting(verifiesEmailExistingDto));
    });
  });
  describe('verify for password recovery system ', () => {
    it('should return true if email exists', async () => {
      const existingUser = new UserEntity();
      jest
        .spyOn(authService, 'verifyForRecoverySystem')
        .mockResolvedValue({ message: 'Email already exists', existingUser });
      expect(
        await authService.verifyForRecoverySystem(verifiesEmailRecoverDto),
      );
    });
  });

  describe('recover password for user', () => {
    it('should recover password if success', async () => {
      const existingUser = new UserEntity();
      jest
        .spyOn(userService, 'recoverPassword')
        .mockResolvedValue(existingUser);
      expect(
        await userService.recoverPassword(token, verifiesPassworRecoverdDto),
      );
    });
  });
});
