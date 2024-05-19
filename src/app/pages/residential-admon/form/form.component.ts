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

  public manager = new FormGroup({
    name: new FormControl(null),
    lastname: new FormControl(null),
    document_type: new FormControl(null),
    document: new FormControl(null),
    password: new FormControl(null),
    building: new FormControl(null),
    tower: new FormControl(null),
  });

  ngOnInit(): void {
    if( this.unidadResidencialAdmonData ) {
      this.manager.patchValue({
        ...this.unidadResidencialAdmonData as any
      })
    }
  }

  onSave(): void {
    this.activeModal.close(this.manager.value);
  }
}
