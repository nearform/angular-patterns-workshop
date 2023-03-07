import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { LoggingService } from './services/logging.service';
import { Injectable } from '@angular/core';

@Injectable()
class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private loggingService: LoggingService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error) => {
        this.loggingService.logError(
          error.message ? error.message : error.toString()
        );
        return throwError(error);
      })
    );
  }
}

export function provideServerErrorInterceptor() {
  return {
    provide: HTTP_INTERCEPTORS,
    useClass: ServerErrorInterceptor,
    multi: true,
  };
}
