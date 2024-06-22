import { NgIf } from '@angular/common';
import { Component, DoCheck, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { errorMessages } from '@shared/dictionary/error-message/errorMessage';

@Component({
  selector: 'shared-show-error-form',
  standalone: true,
  imports: [NgIf],
  templateUrl: './show-error.component.html',
  styleUrl: 'show-error.component.scss',
})
export class ShowErrorComponent implements DoCheck {
  @Input({ required: false }) errorLimits?: {
    min?: number;
    max?: number;
    length?: number;
  };
  @Input({ required: true }) control: AbstractControl | null = null;

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
        return errorMessages.stringRangeLength(
          this.errorLimits?.min,
          this.errorLimits?.max
        );
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
