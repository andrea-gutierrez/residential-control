import { TestBed } from '@angular/core/testing';

import { ResidentialUnitManagerService } from './residential-unit-manager.service';
import {provideHttpClient} from "@angular/common/http";

describe('ResidentialUnitManagerService', () => {
  let service: ResidentialUnitManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(ResidentialUnitManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
