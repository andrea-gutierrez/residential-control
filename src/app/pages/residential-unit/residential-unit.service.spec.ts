import { TestBed } from '@angular/core/testing';

import { ResidentialUnitService } from './residential-unit.service';

describe('ResidentialUnitService', () => {
  let service: ResidentialUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResidentialUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
