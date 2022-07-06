import { CompanyEntity } from '../entities';
import { Connection } from 'typeorm';
import { COMPANY_REPOSITORY } from '../../constants/constants';
import { DATABASE_CONNECTION } from '../../constants/db-constants';

export const companyProviders = [
  {
    provide: COMPANY_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(CompanyEntity),
    inject: [DATABASE_CONNECTION],
  },
];
