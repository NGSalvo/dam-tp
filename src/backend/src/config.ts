import { config as dotenv } from 'dotenv';
import { PoolOptions } from 'mysql2/typings/mysql';

dotenv();

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
} as PoolOptions;
