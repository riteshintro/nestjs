import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './drizzle.provider';
// import { databaseConfig } from '../config/database.config';

@Module({
  imports: [ConfigModule],
  providers: [databaseConfig],
  exports: [databaseConfig],
})
export class DrizzleModule {}