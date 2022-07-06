import { companyProviders } from './company.provider';
import { countryProviders } from './country.providers';
import { merchantServiceProviders } from './merchant-service.provider';
import { paymentModeProviders } from './payment-mode.provider';
import { transactionProviders } from './transaction.provider';
import { userProviders } from './user.provider';
import { withDrawalProviders } from './with-drawal.provider';

export const dbProviders = [
  ...companyProviders,
  ...merchantServiceProviders,
  ...paymentModeProviders,
  ...transactionProviders,
  ...userProviders,
  ...withDrawalProviders,
  ...countryProviders,
];
