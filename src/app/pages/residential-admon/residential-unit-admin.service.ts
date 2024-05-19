import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResidentialUnitAdminService {
  private http = inject(HttpClient);

  constructor() { }

  getAll() {
    console.log('oe');
    return this.http.get(`${environment.BACKEND}/managers`);
  }
}
