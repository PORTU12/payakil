import { MerchantServiceEntity } from '../entities';
import { Connection } from 'typeorm';
import { MERCHANTSERVICE_REPOSITORY } from '../../constants/constants';
import { DATABASE_CONNECTION } from '../../constants/db-constants';

export const merchantServiceProviders = [
  {
    provide: MERCHANTSERVICE_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(MerchantServiceEntity),
    inject: [DATABASE_CONNECTION],
  },
];
