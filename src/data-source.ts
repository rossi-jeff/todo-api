import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({ path: '.env' });

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: 3306,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ['./src/**/*.entity.ts'],
  migrations: ['./src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  // logging: true, // Enable if require to see DB queries/logs
};

// Used by TypeORM CLI for migrations
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
