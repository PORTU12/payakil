import { TransactionEntity } from '../entities';
import { Connection } from 'typeorm';
import { TRANSACTION_REPOSITORY } from '../../constants/constants';
import { DATABASE_CONNECTION } from '../../constants/db-constants';

export const transactionProviders = [
  {
    provide: TRANSACTION_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(TransactionEntity),
    inject: [DATABASE_CONNECTION],
  },
];
