import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { LoadingInterceptor } from './loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(
      withInterceptorsFromDi()   // ✅ IMPORTANT
    ),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ]
};
