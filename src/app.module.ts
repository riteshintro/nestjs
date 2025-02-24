import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [DrizzleModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
