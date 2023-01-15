import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.MONGODB_URL,
  useNewUrlParser: true,
  logging: true,
  useUnifiedTopology: true,
  synchronize: true,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  entities: [__dirname + '/../**/*.entity.js'],
});
