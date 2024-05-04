import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialUnitComponent } from './residential-unit.component';
import { FormComponent } from './form/form.component';

describe( 'ResidentialUnitComponent', () => {
  let component: ResidentialUnitComponent;
  let fixture: ComponentFixture<ResidentialUnitComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule( {
      imports: [ ResidentialUnitComponent, FormComponent ]
    } )
      .compileComponents();

    fixture = TestBed.createComponent( ResidentialUnitComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );

  it( 'should have the button create a new residential unit', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect( compiled.querySelector( 'button' )?.textContent ).toContain( 'Nuevo' );
  } );

  it( 'Should open the modal with the title Nuevo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector( 'button' );
    button?.click();

    fixture.whenStable().then( () => {
      expect( compiled.querySelector( '.modal' )?.textContent ).toContain( 'Nuevo' );
    } );
  } );
} );
