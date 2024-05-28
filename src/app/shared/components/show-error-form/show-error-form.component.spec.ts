import '@testing-library/jest-dom';

import {screen, render} from "@testing-library/angular";

import {ShowErrorFormComponent} from './show-error-form.component';
import {FormControl, Validators} from "@angular/forms";
import {
  onlyNumberValidator,
  onlyLetterValidator,
  stringRangeLengthValidator,
  specialCharacterValidator
} from '../../validators';
import {errorMessages} from "../../dictionary/error-message/errorMessage";

describe('ShowErrorFormComponent', () => {

  it(`should show "${errorMessages.required}" when the input is required`, async () => {
    const control = new FormControl('testing', [Validators.required]);
    const {rerender, detectChanges} = await render(ShowErrorFormComponent, {
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

    detectChanges();

    const message = screen.getByText(errorMessages.required);

    expect(message).toBeVisible();
  });

  it(`should show "${errorMessages.specialCharacter}"`, async () => {
    const control = new FormControl('', [specialCharacterValidator()]);

    const {rerender, detectChanges} = await render(ShowErrorFormComponent, {
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

    detectChanges();

    const message = screen.getByText(errorMessages.specialCharacter);

    expect(message).toBeVisible();
  });

  it(`should show "${errorMessages.minlength(8)}"`, async () => {
    const control = new FormControl('', [Validators.minLength(8)]);
    const {rerender, detectChanges} = await render(ShowErrorFormComponent, {
      componentInputs: {
        control,
        inputName: 'item',
        errorLimits: {min: 8}
      }
    });

    control.patchValue('testing');
    control.markAsDirty();

    await rerender({
      componentInputs: {
        control,
      },
      partialUpdate: true
    });

    detectChanges();

    const message = screen.getByText(errorMessages.minlength(8));

    expect(message).toBeVisible();
  });

  describe('onlyLetter', () => {
    it(`should show "${errorMessages.onlyLetter}"`, async () => {
      const control = new FormControl('', [onlyLetterValidator()]);

      const {rerender, detectChanges} = await render(ShowErrorFormComponent, {
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

      detectChanges();

      const message = screen.getByText(errorMessages.onlyLetter);

      expect(message).toBeVisible();
    });

    it('should not show any error if the item does not have any number', async () => {
      const control = new FormControl('', [onlyLetterValidator()]);

      const {rerender, detectChanges} = await render(ShowErrorFormComponent, {
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

      detectChanges();

      const message = screen.queryByText(errorMessages.onlyLetter);

      expect(message).toBeNull();
    });
  });

  describe('stringRangeLength', () => {
    it(`should show "${errorMessages.stringRangeLength(8, 10)}"`, async () => {
      const control = new FormControl('', [stringRangeLengthValidator(8, 10)]);

      const {rerender, detectChanges} = await render(ShowErrorFormComponent, {
        componentInputs: {
          control,
          inputName: 'item',
          errorLimits: {min: 8, max: 10}
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

      detectChanges();

      const message = screen.getByText(errorMessages.stringRangeLength(8, 10));

      expect(message).toBeVisible();
    });

    it('should not show any error if the item is between the range expected', async () => {
      const control = new FormControl('', [stringRangeLengthValidator(8, 10)]);

      const {rerender, detectChanges} = await render(ShowErrorFormComponent, {
        componentInputs: {
          control,
          inputName: 'item',
          errorLimits: {min: 8, max: 10}
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

      detectChanges();

      const message = screen.queryByText(errorMessages.stringRangeLength(8, 10));

      expect(message).toBeNull();
    });
  });

  describe('isNumber', () => {
    it(`should show "${errorMessages.isNumber}"`, async () => {
      const control = new FormControl('', [onlyNumberValidator()]);

      const {rerender, detectChanges} = await render(ShowErrorFormComponent, {
        componentInputs: {
          control,
          inputName: 'item',
        }
      });

      control.patchValue('4d3');
      control.markAsDirty();

      await rerender({
        componentInputs: {
          control,
        },
        partialUpdate: true
      });

      detectChanges();

      const message = screen.getByText(/Debe contener solo números/i);

      expect(message).toBeVisible();
    });

    it('should not show any error if the item is a number', async () => {
      const control = new FormControl('', [onlyNumberValidator()]);

      const {rerender, detectChanges} = await render(ShowErrorFormComponent, {
        componentInputs: {
          control,
          inputName: 'item',
        }
      });

      control.patchValue('32442');
      control.markAsDirty();

      await rerender({
        componentInputs: {
          control,
        },
        partialUpdate: true
      });

      detectChanges();

      const message = screen.queryByText(/El item debe ser solo números/i);

      expect(message).toBeNull();
    });
  });
});
