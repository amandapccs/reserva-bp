import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const getDataSource = (
  configService = new ConfigService(),
): DataSourceOptions => {
  const appEnv = configService.get<string>('APP_ENV');
  const isLocal = appEnv === 'local';
  const verboseLog = configService.get<string>('LOG_LEVEL') === 'verbose';
  const sslOptions = {
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  };

  const databaseFromEnv = configService.get<string>('POSTGRES_DATABASE');
  const database =
    configService.get('NODE_ENV') === 'test'
      ? `${databaseFromEnv}_test`
      : databaseFromEnv;

  return {
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database,
    //namingStrategy: new CustomNamingStrategy(),
    port: 5432,
    synchronize: false,
    logging: verboseLog,
    entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    subscribers: [],
    ...(isLocal ? {} : sslOptions),
    migrations: [__dirname + '/migrations/**/*.{js,ts}'],
  };
};

export default new DataSource(getDataSource());
