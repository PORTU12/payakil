import { RegisterAccountDto } from '../dtos/register-account.dto';
import { company } from './company-stub';
import { registerUser } from './user-stub';

export const registerAccountDto: RegisterAccountDto = {
  company,
  user: registerUser,
};

export const createAccountStub = {
  message: 'Un message a été envoyé dans votre e-mail pour validation !',
};
