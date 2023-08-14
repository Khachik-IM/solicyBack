import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger: Logger;

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    this.logger = new Logger();
  }

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseInfo =
      exception instanceof HttpException ? exception?.getResponse() : exception;
    const message =
      exception instanceof HttpException
        ? responseInfo.message || exception.message
        : 'Internal server error';

    const responseBody = {
      success: false,
      error: { errorMessage: message },
    };

    if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      responseBody.error.errorMessage = 'Internal server error';
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
