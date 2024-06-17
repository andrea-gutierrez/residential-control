import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {catchError, finalize, Observable, throwError} from "rxjs";
import {LoadingService} from "../../shared/services/loading.service";

@Injectable()
export class LoadingHandlerInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showSpinner();
    return next.handle(req)
      .pipe(catchError(error => {
        this.loadingService.hideSpinner();
        return throwError(() => error);
      }))
      .pipe(
        finalize(() => this.loadingService.hideSpinner())
      );
  }
}
