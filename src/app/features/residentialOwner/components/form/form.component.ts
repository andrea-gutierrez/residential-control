import {Component, inject, Input} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ShowErrorComponent} from "@shared/components/form/show-error/show-error.component";
import {NgClass, NgForOf} from "@angular/common";
import {DocumentType, DocumentTypeMapping} from "../../../../shared/enums/document.enum";
import {InputComponent} from "../../../../shared/components/form/input/input.component";

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgForOf,
    ShowErrorComponent,
    InputComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input({required: true}) modalTitle!: string;

  public activeModal = inject(NgbActiveModal);

  protected readonly documentLengthRange = {min: 8, max: 10};
  protected readonly documentTypeList = Object.values(DocumentType).map(document => {
    return {
      id: document,
      value: DocumentTypeMapping[document]
    }
  });

  public form: FormGroup = new FormGroup({
    apartment: new FormControl('', [Validators.required]),
    document: new FormControl(''),
    documentType: new FormControl(''),
    email: new FormControl(''),
    isActive: new FormControl(''),
    lastname: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    plate: new FormControl(''),
    qrId: new FormControl(''),
    role: new FormControl(true),
    tower: new FormControl(''),
    vehicleActive: new FormControl(''),
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
  }

}
