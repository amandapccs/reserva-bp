import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const getDataSource = (
  configService = new ConfigService(),
): DataSourceOptions => {
  const logging = configService.get<string>('LOG_LEVEL') === 'verbose';

  return {
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DATABASE'),
    port: 5432,
    synchronize: false,
    logging,
    entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    subscribers: [],
    migrations: [__dirname + '/migrations/**/*.{js,ts}'],
  };
};

export default new DataSource(getDataSource());
