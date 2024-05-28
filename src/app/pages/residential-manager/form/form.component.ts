import {Component, inject, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {ResidentialUnit} from "../../residential-unit/residentialUnit.interface";
import {ShowErrorFormComponent} from "../../../shared/components/show-error-form/show-error-form.component";
import {
  onlyLetterValidator,
  stringRangeLengthValidator,
  specialCharacterValidator,
  onlyNumberValidator
} from "../../../shared/validators";
import Swal from "sweetalert2";
import {ResidentialUnitManagerService} from "../service/residential-unit-manager.service";

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ShowErrorFormComponent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  @Input({required: true}) modalTitle = 'Add';

  @Input() unidadResidencialAdminData: ResidentialUnit | null = null;

  public activeModal = inject(NgbActiveModal);

  public documentLengthRange = {min: 8, max: 10};

  private residentialManagerService = inject(ResidentialUnitManagerService);

  public managerForm = new FormGroup({
    name: new FormControl('', [Validators.required, specialCharacterValidator(), onlyLetterValidator()]),
    lastname: new FormControl('', [Validators.required, onlyLetterValidator(), specialCharacterValidator()]),
    document_type: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required, stringRangeLengthValidator(this.documentLengthRange.min, this.documentLengthRange.max), specialCharacterValidator()]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    building: new FormControl('', [Validators.required, specialCharacterValidator()]),
    tower: new FormControl('', [Validators.required, onlyNumberValidator()]),
  });

  get name() {
    return this.managerForm.get('name');
  }

  get lastname() {
    return this.managerForm.get('lastname');
  }

  get documentType() {
    return this.managerForm.get('document_type');
  }

  get document() {
    return this.managerForm.get('document');
  }

  get password() {
    return this.managerForm.get('password');
  }

  get tower() {
    return this.managerForm.get('tower');
  }

  get building() {
    return this.managerForm.get('building');
  }

  ngOnInit(): void {
    if (this.unidadResidencialAdminData) {
      this.managerForm.patchValue({
        ...this.unidadResidencialAdminData as any
      });
    }
  }

  onSave(): void {
    this.residentialManagerService.save(this.managerForm.value).subscribe({
      next: () => {
        Swal.fire({
          text: 'Fue guardado con éxito',
          icon: 'success'
        });
        this.activeModal.close(this.managerForm.value);
      }
    });
  }
}
