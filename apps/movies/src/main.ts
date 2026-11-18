import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr,
} from '@angular/common/http';
import { provideServerErrorInterceptor } from './app/server-error-interceptor';
import { provideClientErrorHandler } from './app/client-error-handler';
import { MatSnackBarModule } from '@angular/material/snack-bar';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideClientErrorHandler(),
    provideServerErrorInterceptor(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    importProvidersFrom(BrowserAnimationsModule, MatSnackBarModule),
  ],
}).catch((err) => console.error(err));
