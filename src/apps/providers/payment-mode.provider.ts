import { PaymentMode } from '../entities';
import { Connection } from 'typeorm';
import { PAYMENTMODE_REPOSITORY } from '../../constants/constants';
import { DATABASE_CONNECTION } from '../../constants/db-constants';

export const paymentModeProviders = [
  {
    provide: PAYMENTMODE_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(PaymentMode),
    inject: [DATABASE_CONNECTION],
  },
];
