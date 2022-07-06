import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { version } from './environments/version';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './shared/exceptions/exception-filter';
import { JwtAuthGuard } from './shared/passport/guards/jwt-auth.guard';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  /* configurer des intercepteurs globaux --- Les intercepteurs globaux sont utilisés dans l’ensemble de l’application, 
  pour chaque contrôleur et chaque gestionnaire d’itinéraire. En termes d’injection de dépendance, intercepteurs globaux 
  enregistrés de l’extérieur de n’importe quel module (avec useGlobalInterceptors(), comme dans l’exemple ci-dessous) ne 
  peut pas injecter de dépendances car cela se fait en dehors du contexte de n’importe quel module.*/
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  // Add swagger config
  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('AKILPAY API')
      .setDescription(
        'AKILPAY is a payment platform for Mobile Money and VISA/Mastercard',
      )
      .setVersion(version)
      .addTag('AKILPAY API')
      .setContact(
        'akiltechnologies',
        'akiltechnologies.com',
        'akilcab@akiltechnologies.com',
      )
      .addApiKey(null, 'X-Api-Key')
      .build();
    const doc = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/docs', app, doc);
  }
  /*Swagger generates a web page that we can publish so that people can view our API and make HTTP requests. It is a great 
  tool to share knowledge with other people working in our organization. If our API is open to the public, we can also 
  deploy the above page and share it with everyone.*/

  await app.listen(PORT);
  if (process.env.NODE_ENV !== 'production') {
    logger.log(
      `You start the project in environment: ${process.env.NODE_ENV?.toLocaleUpperCase()}`,
    );
    logger.log(`Project is running at: http://${process.env.API_HOST}:${PORT}`);
  }
}
bootstrap();
