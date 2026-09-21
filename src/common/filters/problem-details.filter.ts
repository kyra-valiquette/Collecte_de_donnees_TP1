import {ArgumentsHost, Catch, ExceptionFilter, HttpException,HttpStatus,} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProblemDetails } from '../interfaces/problem-details.interface.js';

@Catch()
export class ProblemDetailsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let title = 'Internal Server Error';
    let detail = 'An unexpected error occurred.';
    let type = '/errors/internal-server-error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        detail = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse
      ) {
        const message = exceptionResponse.message;

        if (Array.isArray(message)) {
          detail = message.join(', ');
        } else if (typeof message === 'string') {
          detail = message;
        }
      }

      if (status === HttpStatus.BAD_REQUEST) {
        title = 'Bad Request';
        type = '/errors/bad-request';
      } else if (status === HttpStatus.NOT_FOUND) {
        title = 'Resource Not Found';
        type = '/errors/not-found';
      } else if (status === HttpStatus.CONFLICT) {
        title = 'Conflict';
        type = '/errors/conflict';
      }
    }

    const problem: ProblemDetails = {
      type,
      title,
      status,
      detail,
      instance: request.originalUrl,
    };

    response
      .status(status)
      .type('application/problem+json')
      .json(problem);
  }
}