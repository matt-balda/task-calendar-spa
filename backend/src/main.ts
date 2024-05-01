import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Task calendar SPA of the day')
    .setDescription('The present api intended for task crud')
    .setVersion('0.1')
    //.addTag('tasks')
    .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document);
  await app.listen(3008);
}
bootstrap();
