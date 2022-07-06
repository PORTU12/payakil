import { UserEntity } from '../entities';
import { LoginDto } from '../dtos/login.dto';
import { VerifiesEmailDto } from '../dtos/verify-email-resent.dto';
import { VerifiesEmailExistingDto } from '../dtos/verify-email-exiting.dto';
import { VerifiesPassworRecoverdDto } from '../dtos/verify-password-recover.dto';
import { VerifiesEmailRecoverDto } from '../dtos/verify-email-recover.dto';

export const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwd2QiOiJkYW5pZWwyMCIsImlhdCI6MTY0NzM0MDA2OSwiZXhwIjoxNjQ3NDI2MDY5fQ.Sr7cLcnTXcVDIBw2nZSTilSRUzRvuX6ckt9Me6klpcA';

export const loginDto: LoginDto = {
  email: 'duverdier.kouadio@akiltechnologies.com',
  password: '12345',
};

export const mockAuthService = {
  login: jest.fn().mockImplementation(() => Promise.resolve(loginStub)),
  verifiesEmail: jest
    .fn()
    .mockImplementation(() => Promise.resolve(verifiesEmailStub)),
  resentEmail: jest
    .fn()
    .mockImplementation(() => Promise.resolve(resentEmailStub)),
};

export const loginStub = {
  user: new UserEntity(),
  accessTokenUser:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1dmVyZGllci5qdW5pb3IxQGdtYWlsLmNvbSIsImlhdCI6MTYzMTAxNTA2OCwiZXhwIjoxNjMxMTAxMDY4fQ.FrWb9Xs6Xkr2myT09pFBZ_JrwT7pAgDh7ZYKwjkGfb4',
  exp: '133444',
};

export const verifiesEmailStub = {
  message: 'Your email has been validated !',
};

export const resentEmailStub = {
  message: 'Votre mot de passe a été modifié',
};

export const mockUserRepository = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findOneByEmail: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

export const verifiesEmailDto: VerifiesEmailDto = {
  token,
};

export const verifiesEmailExistingDto: VerifiesEmailExistingDto = {
  email: 'duverdier.kouadio@akiltechnologies.com',
};
export const verifiesPassworRecoverdDto: VerifiesPassworRecoverdDto = {
  password: 'Test**@12345',
};

export const verifiesEmailRecoverDto: VerifiesEmailRecoverDto = {
  email: 'duverdier.kouadio@akiltechnologies.com',
};
