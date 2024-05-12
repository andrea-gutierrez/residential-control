import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialAdmonsComponent } from './residential-admons.component';

describe('ResidentialAdmonsComponent', () => {
  let component: ResidentialAdmonsComponent;
  let fixture: ComponentFixture<ResidentialAdmonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentialAdmonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResidentialAdmonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
