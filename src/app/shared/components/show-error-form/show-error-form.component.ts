import {Component, DoCheck, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";

import {errorMessages} from "../../dictionary/error-message/errorMessage";

@Component({
  selector: 'shared-show-error-form',
  standalone: true,
  templateUrl: './show-error-form.component.html',
})
export class ShowErrorFormComponent implements DoCheck {
  @Input({required: true}) control: AbstractControl | null = null;

  @Input({required: false}) errorLimits?: { min?: number, max?: number, length?: number };

  public errorMessage = '';

  ngDoCheck(): void {
    this.errorMessage = this.getErrorMessage();
  }

  getErrorMessage(): string {
    const firstError = Object.keys(this.control?.errors ?? {})[0];
    switch (firstError) {
      case 'required':
        return errorMessages.required;
      case 'specialCharacter':
        return errorMessages.specialCharacter;
      case 'onlyLetter':
        return errorMessages.onlyLetter;
      case 'stringRangeLength':
        return errorMessages.stringRangeLength(this.errorLimits?.min, this.errorLimits?.max);
      case 'minlength':
        return errorMessages.minlength(this.errorLimits?.min);
      case 'isNumber':
        return errorMessages.isNumber;
      case 'email':
        return errorMessages.email;
      case 'stringLength':
        return errorMessages.stringLength(this.errorLimits?.length);
      default:
        return '';
    }
  }
}
