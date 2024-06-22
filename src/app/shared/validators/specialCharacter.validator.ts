import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function specialCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasSpecialCharacters = !/^[a-zA-Z0-9 ]*$/.test(value);

    return hasSpecialCharacters ? { specialCharacter: true } : null;
  };
}
