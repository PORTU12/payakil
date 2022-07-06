import { UserDto } from './../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from './../../apps/services/user.service';
import { UserController } from './user.controller';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { MailService } from '../services';
import { VerifiesPasswordDto } from '../dtos/verify-password.dto';

describe('UserController', () => {
  let app: INestApplication;
  let userController: UserController;
  let userService: UserService;

  const mockUser = {
    getAll: jest.fn(),
  };

  const mockMailService = {
    sendVerifyEmail: jest.fn(),
  };
  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUser,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
    await app.init();
  });
  it('UserController - should be defined', () => {
    expect(userController).toBeDefined();
  });
  it('UserService - should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('get one User', () => {
    it('should return an entity of user if successful', async () => {
      const expectedResult = new UserEntity();
      const mockNumberToSatisfyParameters = '';
      jest
        .spyOn(userController, 'getUserbyId')
        .mockResolvedValue(expectedResult);
      expect(
        await userController.getUserbyId(mockNumberToSatisfyParameters),
      ).toBe(expectedResult);
    });
  });
  describe('get all Users', () => {
    it('should return all users if successful', async () => {
      const expectedResult = [];
      jest.spyOn(userController, 'getUsers').mockResolvedValue(expectedResult);
      expect(await userController.getUsers()).toBe(expectedResult);
    });
  });

  describe('Create User ', () => {
    const dto = new UserDto();
    it('should return an object of user entity when created', async () => {
      const expectedResult = new UserEntity();
      jest.spyOn(userController, 'Create').mockResolvedValue(expectedResult);
      expect(await userController.Create(dto)).toBe(expectedResult);
    });
  });

  describe('update User', () => {
    it('should update a user if successful', async () => {
      const expectedResult = new UserEntity();
      const mockNumberToSatisfyParameters = new UserDto();
      jest.spyOn(userController, 'editUser').mockResolvedValue(expectedResult);
      expect(await userController.editUser(mockNumberToSatisfyParameters)).toBe(
        expectedResult,
      );
    });
  });
  describe('delete User', () => {
    it('should delete a user if successful', async () => {
      const expectedResult: any = async (id: string): Promise<void> => {
        userController.getUserbyId(id);
      };
      const mockNumberToSatisfyParameters = new UserEntity();
      jest
        .spyOn(userController, 'deleteUser')
        .mockResolvedValue(expectedResult);
      expect(
        await userController.deleteUser(mockNumberToSatisfyParameters.id),
      ).toBe(expectedResult);
    });
  });
  describe('update User password', () => {
    it('should update user password if successful', async () => {
      const expectedResult = new UserEntity();
      const verifiesPasswordDto = new VerifiesPasswordDto();
      const mockNumberToSatisfyParameters = new UserEntity();
      jest
        .spyOn(userController, 'editPassword')
        .mockResolvedValue(expectedResult);
      expect(
        await userController.editPassword(
          mockNumberToSatisfyParameters,
          verifiesPasswordDto,
        ),
      ).toBe(expectedResult);
    });
  });
});
