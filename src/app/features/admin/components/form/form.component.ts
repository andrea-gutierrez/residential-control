import { NgClass } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { InputComponent } from '@shared/components/form/input/input.component';
import { ShowErrorComponent } from '@shared/components/form/show-error/show-error.component';
import { DocumentType, DocumentTypeMapping } from '@shared/enums/document.enum';
import { FormActions } from '@shared/interfaces/formActions.enum';
import {
  onlyLetterValidator,
  onlyNumberValidator,
  specialCharacterValidator,
  stringLengthValidator,
  stringRangeLengthValidator,
} from '@shared/validators';

import { ResidentialOwner, ResidentialOwnerResponse } from '../../interfaces';
import { ResidentialOwnerService } from '../../services/residential-owner.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, ShowErrorComponent, NgClass, InputComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  @Input({ required: true }) modalTitle = 'Add';
  @Input({ required: false }) residentialOwnerInfo?: ResidentialOwner;

  public activeModal = inject(NgbActiveModal);

  private formAction = FormActions.Create;

  protected readonly documentLengthRange = { min: 8, max: 10 };
  protected readonly DocumentTypeMapping = DocumentTypeMapping;
  protected readonly documentationTypeList = Object.values(DocumentType);

  private residentialOwnerService = inject(ResidentialOwnerService);

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      specialCharacterValidator(),
      onlyLetterValidator(),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      onlyLetterValidator(),
      specialCharacterValidator(),
    ]),
    documentType: new FormControl('', [Validators.required]),
    document: new FormControl('', [
      Validators.required,
      stringRangeLengthValidator(
        this.documentLengthRange.min,
        this.documentLengthRange.max
      ),
      specialCharacterValidator(),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    building: new FormControl('', [
      Validators.required,
      specialCharacterValidator(),
    ]),
    tower: new FormControl('', [Validators.required, onlyNumberValidator()]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      onlyNumberValidator(),
      specialCharacterValidator(),
      stringLengthValidator(10),
    ]),
  });

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get phone() {
    return this.form.get('phone');
  }

  get lastname() {
    return this.form.get('lastname');
  }

  get documentType() {
    return this.form.get('documentType');
  }

  get document() {
    return this.form.get('document');
  }

  get password() {
    return this.form.get('password');
  }

  get tower() {
    return this.form.get('tower');
  }

  get building() {
    return this.form.get('building');
  }

  ngOnInit(): void {
    this.formAction = this.residentialOwnerInfo
      ? FormActions.Edit
      : FormActions.Create;
    if (this.formAction === FormActions.Edit) {
      this.form.patchValue({
        ...(this.residentialOwnerInfo as any),
      });
    }
  }

  onSave(): void {
    const api = this.apiCall();
    api.subscribe({
      next: () => {
        const alertText =
          this.formAction === FormActions.Edit ? 'editado' : 'guardado';

        Swal.fire({
          text: `Fue ${alertText} con éxito`,
          icon: 'success',
        });

        this.activeModal.close(true);
      },
    });
  }

  apiCall(): Observable<ResidentialOwnerResponse> {
    if (this.formAction === FormActions.Edit) {
      return this.residentialOwnerService.create(this.form.value);
    }

    return this.residentialOwnerService.edit(this.form.value);
  }
}
