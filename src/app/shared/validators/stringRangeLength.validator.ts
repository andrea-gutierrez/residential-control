import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function stringRangeLengthValidator(
  min: number,
  max: number
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }
    const isGreater = value.length > max;
    const isLower = value.length < min;

    const isValid = isGreater || isLower;

    return isValid ? { stringRangeLength: true } : null;
  };
}
