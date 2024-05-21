import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {tap, Observable} from "rxjs";

import Swal from "sweetalert2";
import {Injectable} from "@angular/core";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap({
          error: (_error: any) => {
            console.error(_error);
            Swal.fire({
              text: 'Error inesperado',
              icon: 'error'
            });
          }
        })
      );
  }
}
