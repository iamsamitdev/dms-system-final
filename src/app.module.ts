import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { RoleModule } from './roles/role.module'
import { AuthModule } from './auth/auth.module';
import { BackendModule } from './backend/backend.module';

import * as dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_NAME || 'dms',
      synchronize: true,
      autoLoadEntities: true,
      logging: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    }),
    UserModule,
    RoleModule,
    AuthModule,
    BackendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
