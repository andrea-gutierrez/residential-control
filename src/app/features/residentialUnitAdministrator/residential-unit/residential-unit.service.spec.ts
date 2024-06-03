import { TestBed } from '@angular/core/testing';

import { ResidentialUnitService } from './residential-unit.service';
import {provideHttpClient} from "@angular/common/http";

describe('ResidentialUnitService', () => {
  let service: ResidentialUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(ResidentialUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
