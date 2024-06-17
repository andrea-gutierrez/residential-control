import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialOwnerComponent } from './residential-owner.component';

describe('ResidentialUnitComponent', () => {
  let component: ResidentialOwnerComponent;
  let fixture: ComponentFixture<ResidentialOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentialOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentialOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
