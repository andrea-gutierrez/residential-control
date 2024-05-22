import {Component, inject, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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

  @Input() unidadResidencialAdminData: ResidentialUnit | null = null;

  public activeModal = inject( NgbActiveModal );

  public manager = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]),
    lastname: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]),
    document_type: new FormControl(null),
    document: new FormControl(null),
    password: new FormControl(null),
    building: new FormControl(null),
    tower: new FormControl(null),
  });

  get name() {
    return this.manager.get('name');
  }

  get lastname() {
    return this.manager.get('lastname');
  }

  ngOnInit(): void {
    if( this.unidadResidencialAdminData ) {
      this.manager.patchValue({
        ...this.unidadResidencialAdminData as any
      })
    }
  }

  onSave(): void {
    this.activeModal.close(this.manager.value);
  }
}
