import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const serverPort = configService.get<string>('SERVER_PORT');

  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(serverPort);
}

bootstrap();
