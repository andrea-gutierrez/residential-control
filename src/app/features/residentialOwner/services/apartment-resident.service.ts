import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import { environment } from '@environment/environment';

import {
  ApartmentResident,
  ApartmentResidentDto,
  ApartmentResidentResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApartmentResidentService {
  private http = inject(HttpClient);

  private apartmentResidentialUrl = `${environment.BACKEND}/residents`;

  constructor() {}

  getAll(): Observable<ApartmentResident[]> {
    return this.http
      .get<ApartmentResidentResponse>(this.apartmentResidentialUrl)
      .pipe(map(res => res.result));
  }

  create(dto: ApartmentResidentDto): Observable<ApartmentResidentResponse> {
    return this.http.post<ApartmentResidentResponse>(
      this.apartmentResidentialUrl,
      {
        ...dto,
      }
    );
  }
}
