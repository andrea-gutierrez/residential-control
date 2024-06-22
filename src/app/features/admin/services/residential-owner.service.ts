import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import { environment } from '@environment/environment';

import {
  ResidentialOwner,
  ResidentialOwnerDto,
  ResidentialOwnerResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ResidentialOwnerService {
  private http = inject(HttpClient);

  private residentialOwnerUrl = `${environment.BACKEND}/managers`;

  constructor() {}

  getAll(): Observable<ResidentialOwner[]> {
    return this.http
      .get<ResidentialOwnerResponse>(this.residentialOwnerUrl)
      .pipe(map(res => res.result));
  }

  create(dto: ResidentialOwnerDto): Observable<ResidentialOwnerResponse> {
    return this.http.post<ResidentialOwnerResponse>(this.residentialOwnerUrl, {
      ...dto,
    });
  }

  edit(dto: ResidentialOwner): Observable<ResidentialOwnerResponse> {
    return this.http.patch<ResidentialOwnerResponse>(
      `${this.residentialOwnerUrl}/${dto.id}`,
      { ...dto }
    );
  }

  remove(document: string): Observable<ResidentialOwnerResponse> {
    return this.http.delete<ResidentialOwnerResponse>(
      `${this.residentialOwnerUrl}/${document}`
    );
  }
}
