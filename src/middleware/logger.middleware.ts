import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import type { Request, Response, NextFunction } from 'express';

// Create a middleware class for logging HTTP requests
@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  // Create a logger instance
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
