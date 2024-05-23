import {Component, inject, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ResidentialUnit} from "../../residential-unit/residentialUnit.interface";
import {ShowErrorFormComponent} from "../../../shared/components/show-error-form/show-error-form.component";
import {specialCharacterValidator} from "../../../shared/validators/specialCharacter.validator";
import {onlyLetterValidator} from "../../../shared/validators/onlyLetter.validator";
import {stringRangeLengthValidator} from "../../../shared/validators/stringRangeLength.validator";

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

  public manager = new FormGroup({
    name: new FormControl(null, [Validators.required, specialCharacterValidator(), onlyLetterValidator()]),
    lastname: new FormControl(null, [Validators.required, onlyLetterValidator(), specialCharacterValidator()]),
    document_type: new FormControl('', [Validators.required]),
    document: new FormControl(null, [Validators.required, stringRangeLengthValidator(this.documentLengthRange.min, this.documentLengthRange.max), specialCharacterValidator()]),
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

  get documentType() {
    return this.manager.get('document_type');
  }

  get document() {
    return this.manager.get('document');
  }

  ngOnInit(): void {
    if (this.unidadResidencialAdminData) {
      this.manager.patchValue({
        ...this.unidadResidencialAdminData as any
      })
    }
  }

  onSave(): void {
    this.activeModal.close(this.manager.value);
  }
}
