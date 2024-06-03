import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe( 'FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule( {
      imports: [ FormComponent ],
      providers: [ NgbActiveModal ]
    } )
      .compileComponents();

    fixture = TestBed.createComponent( FormComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );

  it( 'Should show the title add when is adding a new Resident', () => {
    component.modalTitle = 'Add';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector( '.modal-title' )?.textContent;

    expect( title ).toContain( 'Add' );
  } );

} );
