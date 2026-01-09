import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina props desconocidas
      forbidNonWhitelisted: true, // 400 si viene algo no permitido
      transform: true, // convierte tipos (string->number)
    }),
  );
  app.enableCors({
    origin: ['http://localhost:5173'], // Orígenes permitidos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permite el envío de cookies y cabeceras de autenticación
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
