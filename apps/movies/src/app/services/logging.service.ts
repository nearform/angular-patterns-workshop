import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  logError(message: string) {
    // Log to the console for now...
    console.error(message);
  }
}
