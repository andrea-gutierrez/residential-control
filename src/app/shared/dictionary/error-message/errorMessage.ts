export const errorMessages = {
  required: 'Requerido',
  specialCharacter: 'No puede contener caracteres especiales',
  onlyLetter: 'No puede contener números',
  stringRangeLength: (min = 1, max = 5) => `El número de caracteres debe estar entre ${min} y ${max}`,
  minlength: (length = 1) => `Debe contener al menos ${length} caracteres`,
  isNumber: 'Debe contener solo números'
}
