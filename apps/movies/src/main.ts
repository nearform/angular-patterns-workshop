import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideServerErrorInterceptor } from './app/server-error-interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideServerErrorInterceptor(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    importProvidersFrom(
      // Needed to allow http interceptors to work
      HttpClientModule,
      BrowserAnimationsModule
    ),
  ],
}).catch((err) => console.error(err));
