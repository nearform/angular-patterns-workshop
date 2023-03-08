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
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private loggingService: LoggingService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  intercept(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: HttpRequest<any>,
    next: HttpHandler
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error) => {
        this.loggingService.logError(
          error.message ? error.message : error.toString()
        );
        if (error.status === 401) {
          this.snackBar.open(
            'Authentication error, please login to view this page',
            undefined,
            {
              duration: 3000,
            }
          );
          this.router.navigate(['']);
        }
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
