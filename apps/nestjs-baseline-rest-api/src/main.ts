import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from './app/docs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  // app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
  createDocument(app);

}
bootstrap();
