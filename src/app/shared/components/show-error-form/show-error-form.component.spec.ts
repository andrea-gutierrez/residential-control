import '@testing-library/jest-dom';

import {screen, render} from "@testing-library/angular";

import {ShowErrorFormComponent} from './show-error-form.component';
import {FormControl, Validators} from "@angular/forms";
import {specialCharacterValidator} from "../../validators/specialCharacter.validator";
import {onlyLetterValidator} from "../../validators/onlyLetter.validator";
import {stringRangeLengthValidator} from "../../validators/stringRangeLength.validator";

describe('ShowErrorFormComponent', () => {

  it('should show "El item es requerido" when the input is required', async () => {
    const control = new FormControl('testing', [Validators.required]);
    const {rerender} = await render(ShowErrorFormComponent, {
      componentInputs: {
        control,
        inputName: 'item'
      }
    });

    control.patchValue('');
    control.markAsDirty();

    await rerender({
      componentInputs: {
        control,
      },
      partialUpdate: true
    });

    const message = screen.getByText(/El item es requerido/i);

    expect(message).toBeVisible();
  });

  it('should show "El item no puede contener caracteres especiales"', async () => {
    const control = new FormControl('', [specialCharacterValidator()]);

    const {rerender} = await render(ShowErrorFormComponent, {
      componentInputs: {
        control,
        inputName: 'item'
      }
    });

    control.patchValue('ada32--');
    control.markAsDirty();

    await rerender({
      componentInputs: {
        control,
      },
      partialUpdate: true
    });

    const message = screen.getByText(/El item no puede contener caracteres especiales/i);

    expect(message).toBeVisible();
  });

  describe('onlyLetter', () => {
    it('should show "El item no puede contener números"', async () => {
      const control = new FormControl('', [onlyLetterValidator()]);

      const {rerender} = await render(ShowErrorFormComponent, {
        componentInputs: {
          control,
          inputName: 'item'
        }
      });

      control.patchValue('itemPrueba32');
      control.markAsDirty();

      await rerender({
        componentInputs: {
          control,
        },
        partialUpdate: true
      });

      const message = screen.getByText(/El item no puede contener números/i);

      expect(message).toBeVisible();
    });

    it('should not show any error if the item does not have any number', async () => {
      const control = new FormControl('', [onlyLetterValidator()]);

      const {rerender} = await render(ShowErrorFormComponent, {
        componentInputs: {
          control,
          inputName: 'item'
        }
      });

      control.patchValue('itemPrueba');
      control.markAsDirty();

      await rerender({
        componentInputs: {
          control,
        },
        partialUpdate: true
      });

      const message = screen.queryByText(/El item no puede contener números/i);

      expect(message).toBeNull();
    });
  });

  describe('stringRangeLength', () => {
    it('should show "El número de caracteres del item debe estar entre X y Y"', async () => {
      const control = new FormControl('', [stringRangeLengthValidator(8, 10)]);

      const {rerender} = await render(ShowErrorFormComponent, {
        componentInputs: {
          control,
          inputName: 'item',
          range: {min: 8, max: 10}
        }
      });

      control.patchValue('3fsd');
      control.markAsDirty();

      await rerender({
        componentInputs: {
          control,
        },
        partialUpdate: true
      });

      const message = screen.getByText(/El número de caracteres del item debe estar entre 8 y 10/i);

      expect(message).toBeVisible();
    });

    it('should not show any error if the item is between the range expected', async () => {
      const control = new FormControl('', [stringRangeLengthValidator(8, 10)]);

      const {rerender} = await render(ShowErrorFormComponent, {
        componentInputs: {
          control,
          inputName: 'item',
          range: {min: 8, max: 10}
        }
      });

      control.patchValue('324324hi');
      control.markAsDirty();

      await rerender({
        componentInputs: {
          control,
        },
        partialUpdate: true
      });

      const message = screen.queryByText(/El número de caracteres del item debe estar entre 8 y 10/i);

      expect(message).toBeNull();
    });
  });
});
