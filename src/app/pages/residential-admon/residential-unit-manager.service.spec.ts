import { TestBed } from '@angular/core/testing';

import { ResidentialUnitManagerService } from './residential-unit-manager.service';

describe('ResidentialUnitManagerService', () => {
  let service: ResidentialUnitManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResidentialUnitManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
