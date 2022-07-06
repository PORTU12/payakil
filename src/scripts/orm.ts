import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const orm: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../apps/entities/*.entity.{js,ts}'],
  migrationsTableName: 'migrations',
  migrations:
    process.env.NODE_ENV === 'development'
      ? ['migrations/*.ts']
      : ['dist/migrations/*.js'],
  cli: {
    entitiesDir: 'src/apps/entities',
    migrationsDir: 'migrations' || 'dist/migrations',
  },
  migrationsRun: false,
  logging: true,
  logger: 'file',
};

export default orm;
