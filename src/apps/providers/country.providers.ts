import { Country } from '../entities';
import { Connection } from 'typeorm';
import { COUNTRY_REPOSITORY } from '../../constants/constants';
import { DATABASE_CONNECTION } from '../../constants/db-constants';

export const countryProviders = [
  {
    provide: COUNTRY_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Country),
    inject: [DATABASE_CONNECTION],
  },
];
