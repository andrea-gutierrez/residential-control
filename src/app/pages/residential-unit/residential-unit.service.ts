import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResidentialUnitService {
  private http = inject(HttpClient);

  constructor() { }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8000/residents');
  }
}
