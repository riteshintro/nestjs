import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './database/drizzle.module';
import { BoardModule } from './modules/board/board.module';
import { MediumModule } from './modules/medium/medium.module';
import { StandardModule } from './modules/standard/standard.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }),
  DrizzleModule, BoardModule, MediumModule, StandardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
