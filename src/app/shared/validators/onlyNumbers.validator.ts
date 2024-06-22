import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function onlyNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const isNumber = /^[0-9]*$/.test(value);

    return !isNumber ? { isNumber: true } : null;
  };
}
