import { WithdrawalEntity } from '../entities';
import { Connection } from 'typeorm';
import { WITHDRAWAL_REPOSITORY } from '../../constants/constants';
import { DATABASE_CONNECTION } from '../../constants/db-constants';

export const withDrawalProviders = [
  {
    provide: WITHDRAWAL_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(WithdrawalEntity),
    inject: [DATABASE_CONNECTION],
  },
];
