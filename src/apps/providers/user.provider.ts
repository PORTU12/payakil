import { UserEntity } from '../entities';
import { Connection } from 'typeorm';
import { USER_REPOSITORY } from '../../constants/constants';
import { DATABASE_CONNECTION } from '../../constants/db-constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(UserEntity),
    inject: [DATABASE_CONNECTION],
  },
];
