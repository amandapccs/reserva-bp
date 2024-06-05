import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDataSource } from './shared/db/typeorm.config';
import { MeetingModule } from './meetings/meetings.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './shared/auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: parseInt(process.env.EXPIRES) },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDataSource,
      inject: [ConfigService],
    }),
    UsersModule,
    MeetingModule,
  ],
  controllers: [AppController],
  providers: [AuthService],
})
export class AppModule {}
