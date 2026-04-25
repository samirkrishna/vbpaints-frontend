import { ApplicationConfig ,importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { LoadingInterceptor } from './loading.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), 
    provideRouter(routes),
    importProvidersFrom(MatSnackBarModule),

    provideHttpClient(
      withInterceptorsFromDi()   // ✅ IMPORTANT
    ),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'en-IN' }
  ]
};
