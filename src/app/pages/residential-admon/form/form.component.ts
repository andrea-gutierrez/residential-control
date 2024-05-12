import {Component, inject, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ResidentialUnit} from "../../residential-unit/residentialUnit.interface";

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  @Input( { required: true } ) modalTitle = 'Add';

  @Input() unidadResidencialAdmonData: ResidentialUnit | null = null;

  public activeModal = inject( NgbActiveModal );

  public unidadResidencialAdmon = new FormGroup({
    nombre: new FormControl(null),
    apellido: new FormControl(null),
    tipoDocumento: new FormControl(null),
    documento: new FormControl(null),
    celular: new FormControl(null),
    usuario: new FormControl(null),
    password: new FormControl(null),
    email: new FormControl(null),
  });

  ngOnInit(): void {
    if( this.unidadResidencialAdmonData ) {
      this.unidadResidencialAdmon.patchValue({
        ...this.unidadResidencialAdmonData as any
      })
    }
  }

  onSave(): void {
    this.activeModal.close(this.unidadResidencialAdmon.value)
  }
}
