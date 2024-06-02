import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function stringLengthValidator(length: number,): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if(!value) {
      return null;
    }

    const isValid = value.length === length;

    return !isValid ? {stringLength: true} : null;
  }
}
