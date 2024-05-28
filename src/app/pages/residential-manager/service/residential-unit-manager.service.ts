import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResidentialUnitManagerService {
  private http = inject(HttpClient);

  constructor() {
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.BACKEND}/managers`);
  }

  save(data: any): Observable<any> {
    return this.http.post(`${environment.BACKEND}/managers`, {});
  }
}
