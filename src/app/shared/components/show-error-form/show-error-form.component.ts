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
    if (this.control?.hasError('required')) {
      return errorMessages['required'];
    } else if (this.control?.hasError('specialCharacter')) {
      return errorMessages.specialCharacter;
    } else if (this.control?.hasError('onlyLetter')) {
      return errorMessages.onlyLetter;
    } else if (this.control?.hasError('stringRangeLength')) {
      return errorMessages.stringRangeLength(this.errorLimits?.min, this.errorLimits?.max)
    } else if (this.control?.hasError('minlength')) {
      return errorMessages.minlength(this.errorLimits?.min);
    } else if (this.control?.hasError('isNumber')) {
      return errorMessages.isNumber;
    } else if(this.control?.hasError('email')) {
      return errorMessages.email
    } else if(this.control?.hasError('stringLength')) {
      return errorMessages.stringLength(this.errorLimits?.length)
    }
    return '';
  }
}
