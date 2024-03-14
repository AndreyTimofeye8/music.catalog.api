import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompositionModule } from './composition/composition.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [CompositionModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
