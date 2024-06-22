import { NgClass, NgForOf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
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

import { ApartmentResidentResponse } from '../../interfaces';
import { ApartmentResidentService } from '../../services/apartment-resident.service';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgForOf,
    InputComponent,
    ShowErrorComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input({ required: true }) modalTitle!: string;

  public activeModal = inject(NgbActiveModal);
  private apartmentResidentService = inject(ApartmentResidentService);

  private formAction = FormActions.Create;

  protected readonly documentLengthRange = { min: 8, max: 10 };
  protected readonly documentTypeList = Object.values(DocumentType).map(
    document => {
      return {
        id: document,
        value: DocumentTypeMapping[document],
      };
    }
  );

  public form: FormGroup = new FormGroup({
    apartment: new FormControl('', [
      Validators.required,
      specialCharacterValidator(),
      onlyNumberValidator(),
    ]),
    document: new FormControl('', [
      Validators.required,
      stringRangeLengthValidator(
        this.documentLengthRange.min,
        this.documentLengthRange.max
      ),
      specialCharacterValidator(),
    ]),
    documentType: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    isActive: new FormControl(true),
    lastname: new FormControl('', [
      Validators.required,
      onlyLetterValidator(),
      specialCharacterValidator(),
    ]),
    name: new FormControl('', [
      Validators.required,
      onlyLetterValidator(),
      specialCharacterValidator(),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    phone: new FormControl('', [
      Validators.required,
      onlyNumberValidator(),
      specialCharacterValidator(),
      stringLengthValidator(10),
    ]),
    plate: new FormControl('', [specialCharacterValidator()]),
    qrId: new FormControl(''),
    role: new FormControl(''),
    tower: new FormControl('', [Validators.required, onlyNumberValidator()]),
    vehicleActive: new FormControl(false),
    vehicleType: new FormControl(''),
  });

  get apartment(): AbstractControl | null {
    return this.form.get('apartment');
  }

  get document(): AbstractControl | null {
    return this.form.get('document');
  }

  get documentType(): AbstractControl | null {
    return this.form.get('documentType');
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get lastname(): AbstractControl | null {
    return this.form.get('lastname');
  }

  get name(): AbstractControl | null {
    return this.form.get('name');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  get phone(): AbstractControl | null {
    return this.form.get('phone');
  }

  get plate(): AbstractControl | null {
    return this.form.get('plate');
  }

  get tower(): AbstractControl | null {
    return this.form.get('tower');
  }

  get vehicleType(): AbstractControl | null {
    return this.form.get('vehicleType');
  }

  onSave(): void {
    console.log(this.form.value);
    const api = this.getApiCall();
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

  getApiCall(): Observable<ApartmentResidentResponse> {
    if (this.formAction === FormActions.Create) {
      return this.apartmentResidentService.create(this.form.value);
    }
    return of({} as ApartmentResidentResponse);
    // return this.apartmentResidentService.edit(this.form.value);
  }
}
