import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResidentialUnitManagerService {
  private http = inject(HttpClient);

  constructor() { }

  getAll(): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');
    return this.http.get(`${environment.BACKEND}/managers`, {headers});
  }
}
