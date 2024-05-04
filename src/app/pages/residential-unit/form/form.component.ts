import { Component, Input, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {UnidadResidencial} from "../residentialUnit.interface";

@Component( {
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
} )
export class FormComponent implements OnInit{
  @Input( { required: true } ) modalTitle = 'Add';
  @Input() unidadResidencialData: UnidadResidencial | null = null;

  public activeModal = inject( NgbActiveModal );
  public unidadResidencial = new FormGroup( {
    nombre: new FormControl( null, [ Validators.required, Validators.max( 20 ) ] ),
    direccion: new FormControl(null, [Validators.required, Validators.max(20)]),
    pais: new FormControl(null, [Validators.required]),
    ciudad: new FormControl(null, [Validators.required]),
    departamento: new FormControl(null, [Validators.required]),
    codigoPostal: new FormControl(null, [Validators.required]),
    telefonoAdmon: new FormControl(null, [Validators.required]),
    emailAdmon: new FormControl(null, [Validators.required]),
    empresaVigilancia: new FormControl(null, [Validators.required]),
    nitEmpresaVigilancia: new FormControl(null, [Validators.required]),
    registroInmobiliario: new FormControl(null, [Validators.required]),
  } );

  ngOnInit(): void {
    console.log(this.unidadResidencialData)
    if( this.unidadResidencialData ) {
      this.unidadResidencial.patchValue({
        ...this.unidadResidencialData as any
      })
    }
  }

  onSave(): void {
    this.activeModal.close(this.unidadResidencial.value)
  }
}
