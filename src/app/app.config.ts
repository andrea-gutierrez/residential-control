import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { NgxSpinnerModule } from 'ngx-spinner';

import { routes } from './app.routes';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler-interceptor.service';
import { LoadingHandlerInterceptor } from './core/interceptors/loading-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(HttpClientModule, NgxSpinnerModule.forRoot(/*config*/)),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingHandlerInterceptor,
      multi: true,
    },
  ],
};
