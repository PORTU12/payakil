import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
/*Créons un filtre d’exception chargé d’intercepter les exceptions qui sont une instance de HttpException 
lass, et l’implémentation d’une logique de réponse personnalisée pour eux. Pour ce faire, nous devrons accéder à 
la plate-forme sous-jacente Request et Objets de réponse. Nous accéderons à l’objet Request afin de pouvoir 
extraire l’URL d’origine et l’inclure dans la journalisation information. Nous utiliserons l’objet Response 
pour prendre le contrôle direct de la réponse envoyée, à l’aide du fichier response.json() méthode.*/

import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = {
      statusCode: status,
      date: new Date().toDateString(),
      path: request.url,
      method: request.method,
      message:
        status === HttpStatus.BAD_REQUEST
          ? (exception as any).response.message || (exception as any).response
          : [exception.message] || null,
    };
    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'ExceptionFilter',
    );
    response.status(status).json(errorResponse);
  }
}
