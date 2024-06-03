import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient} from "@angular/common/http";
import {ErrorHandlerInterceptor} from "./core/interceptors/error-handler-interceptor.service";
import {LoadingHandlerInterceptor} from "./core/interceptors/loading-handler.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import {provideAnimations} from "@angular/platform-browser/animations";

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
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingHandlerInterceptor,
      multi: true
    }
  ]
};
