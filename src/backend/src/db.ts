import { dbConfig } from './config';
import { createPool } from 'mysql2/promise';

export const getConnection = async () => {
  return await createPool(dbConfig);
};
