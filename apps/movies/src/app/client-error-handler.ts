import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LoggingService } from './services/logging.service';

@Injectable()
class ClientErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(error: any): void {
    const loggingService = this.injector.get(LoggingService);
    loggingService.logError(error.message ? error.message : error.toString());
  }
}

export function provideClientErrorHandler() {
  return {
    provide: ErrorHandler,
    useClass: ClientErrorHandler,
  };
}
