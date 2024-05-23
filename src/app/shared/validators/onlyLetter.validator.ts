import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function onlyLetterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if(!value) {
      return null;
    }

    const hasNumber = !/^[a-zA-Z ]*$/.test(value);

    return hasNumber ? {onlyLetter: true} : null;
  }
}
