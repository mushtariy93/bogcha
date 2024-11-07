import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { winstonConfig } from './logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    winstonConfig.error(
      `Error occurred: ${exception}`,
      exception instanceof Error ? exception.stack : null,
    );

    const message =
      exception instanceof HttpException
        ? this.formatErrorMessage(exception.getResponse())
        : 'Internal server error';

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }

  private formatErrorMessage(response: string | object): string {
    if (typeof response === 'string') {
      return response;
    } else if (typeof response === 'object' && 'message' in response) {
      return Array.isArray((response as any).message)
        ? (response as any).message.join(', ')
        : (response as any).message;
    }
    return 'An error occurred';
  }
}
