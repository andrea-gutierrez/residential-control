import '@testing-library/jest-dom';
import {of} from "rxjs";
import {provideHttpClient} from "@angular/common/http";

import userEvent from '@testing-library/user-event';
import {screen, render, waitFor} from "@testing-library/angular";

import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {faker} from "@faker-js/faker";

import {DocumentType} from "@shared/enums/document.enum";
import {errorMessages} from "@shared/dictionary/error-message/errorMessage";
import {
  checkMinLength, checkOnlyLetter,
  checkOnlyNumbers,
  checkRangeLengthInput,
  checkRequiredInput,
  checkSpecialCharacters
} from "@shared/tests/formInputs";

import {ResidentialUnitManagerService} from "../../service/residential-unit-manager.service";

import {FormComponent} from "./form.component";

describe('FormComponent Apartment owners', () => {
  const user = userEvent.setup();

  it('should show "Nuevo Administrador" as a title', async () => {
    await render(FormComponent, {
      ...componentProviders,
      componentProperties: {
        modalTitle: 'Nuevo Administrador'
      }
    });

    const title = screen.getByText('Nuevo Administrador');

    expect(title).toBeVisible();
  });

  describe('input Nombre', () => {
    it('should not display any error message when the input has not been dirty', async () => {
      await render(FormComponent, componentProviders);

      expect(screen.queryByText(errorMessages.required)).toBeNull();
    });

    it(`should display an error when it has numbers`, async () => {
      await render(FormComponent, componentProviders);

      await checkOnlyLetter('name', 'Andrea43');
    });

    it('should display an error when empty', async () => {
      await render(FormComponent, componentProviders);

      await checkRequiredInput('name');
    });

    it('should display an error when it has special characters', async () => {
      await render(FormComponent, componentProviders);

      await checkSpecialCharacters('name', 'Andre´a');
    });

    it('should not display any message when the input is valid', async () => {
      await render(FormComponent, componentProviders);

      const nameInput = screen.getByLabelText(/nombre/i);
      await user.type(nameInput, 'Edison');

      expect(screen.queryByText('Solo puede ingresar letras')).toBeNull();
      expect(screen.queryByText('El nombre es requerido')).toBeNull();
    });
  });

  describe('input Email', () => {
    it('should display "Requerido" when the input is empty after dirty', async () => {
      await render(FormComponent, componentProviders);

      await checkRequiredInput('email', 'and');
    });

    it('should show an error when the input is not an email', async () => {
      await render(FormComponent, componentProviders);

      const input = screen.getByTestId('email');
      await user.type(input, 'andrea.com');

      expect(screen.getByText('El formato es inválido')).toBeInTheDocument();
    });

    it('should not show any error when input valid', async () => {
      await render(FormComponent, componentProviders);

      const input = screen.getByTestId('email');
      await user.type(input, 'andrea@gmail.com');

      expect(screen.queryByText('El formato es inválido')).toBeNull();
    });
  });

  describe('input phone', () => {
    it('should display "Requerido" when the input is empty after dirty', async () => {
      await render(FormComponent, componentProviders);

      await checkRequiredInput('phone', 'and');
    });

    it('should show an error when it has letters', async () => {
      await render(FormComponent, componentProviders);

      await checkOnlyNumbers('phone', '432432k432');
    });

    it('should show an error when it has special characters', async () => {
      await render(FormComponent, componentProviders);

      await checkSpecialCharacters('phone', '432432_432');
    });

    it('should show an error when the length different to 10', async () => {
      await render(FormComponent, componentProviders);

      const input = screen.getByTestId('phone');
      await user.type(input, '34234');

      expect(screen.getByText('Debe ser de 10 caracteres')).toBeInTheDocument();
    });

    it('should not show any error when input valid', async () => {
      await render(FormComponent, componentProviders);

      const input = screen.getByTestId('phone');
      await user.type(input, '4565431243');

      expect(screen.queryByText('El formato es inválido')).toBeNull();
    });
  });

  describe('input Apellido', () => {
    it('should not display any error message when the input has not been dirty', async () => {
      await render(FormComponent, componentProviders);

      expect(screen.queryByText('El apellido es requerido')).toBeNull();
    });

    it('should display "Requerido" when the input is empty after dirty', async () => {
      await render(FormComponent, componentProviders);

      await checkRequiredInput('lastname', 'Andrea43');
    });

    it('should display an error when the Apellido has numbers', async () => {
      await render(FormComponent, componentProviders);

      await checkOnlyLetter('lastname', 'Gut6ierrez');
    });

    it('should display an error when the Apellido has special characters', async () => {
      await render(FormComponent, componentProviders);

      await checkSpecialCharacters('lastname', 'Gutiérrez');
    });

    it('should not display any error message when the input is valid', async () => {
      await render(FormComponent, componentProviders);

      const nameInput = screen.getByLabelText(/apellido/i);
      await user.type(nameInput, 'Giraldo');

      expect(screen.queryByText('Solo puede ingresar letras')).toBeNull();
    });
  });

  describe('input Tipo de documento', () => {
    it('should display an error when empty', async () => {
      await render(FormComponent, componentProviders);

      let documentType = screen.getByTestId('documentType');
      await user.selectOptions(documentType, DocumentType.ForeignerId);

      documentType = screen.getByTestId('documentType');
      await user.selectOptions(documentType, '');

      expect(screen.getByText(errorMessages.required)).toBeVisible();
    });

    it('should not display an error when an option selected in the "Tipo de documento"', async () => {
      await render(FormComponent, componentProviders);

      let documentType = screen.getByLabelText(/tipo de documento/i);
      await user.selectOptions(documentType, DocumentType.ForeignerId);

      expect(screen.queryByText("El tipo de documento es requerido")).toBeNull();
    });
  });

  describe('input Documento', () => {
    it('should display an error message when empty: "Requerido"', async () => {
      await render(FormComponent, componentProviders);
      await checkRequiredInput('document');
    });

    it('should display an error when it is out of range from 8 - 10', async () => {
      const range = {min: 8, max: 10};
      await render(FormComponent, componentProviders);
      await checkRangeLengthInput('document', range, faker.string.numeric({length: 6}));
      await checkRangeLengthInput('document', range, faker.string.numeric({length: 11}));
    });

    it('should display an error when it has special characters', async () => {
      await render(FormComponent, componentProviders);

      await checkSpecialCharacters('document', '12321-234');
    });
  });

  describe('input password', () => {
    it('should display an error message when empty: "Requerido"', async () => {
      await render(FormComponent, componentProviders);

      await checkRequiredInput('password', '12323435332');
    });

    it('should display and error when the length is lower than 8', async () => {
      await render(FormComponent, componentProviders);

      await checkMinLength('password', 8, '432432');
    });
  });

  describe('input tower', () => {
    it('should display an error message when empty: "Requerido"', async () => {
      await render(FormComponent, componentProviders);

      await checkRequiredInput('tower', '3jfkls-');
    });

    it('should display an error when it has letters', async () => {
      await render(FormComponent, componentProviders);

      await checkOnlyNumbers('tower', '342k');
    });
  });

  describe('input building', () => {
    it('should display an error message when empty: "Requerido"', async () => {
      await render(FormComponent, componentProviders);

      await checkRequiredInput('building', 'ekd');
    });

    it('should display an error when it has especial characters', async () => {
      await render(FormComponent, componentProviders);

      await checkSpecialCharacters('building', 'A32($');
    });
  });

  describe('submit', () => {
    it('should save the data when it`s valid', async () => {
      const serviceMock = jest.fn().mockImplementation(() => of({successful: true}));
      await render(FormComponent, {
        ...componentProviders,
        componentProviders: [
          {
            provide: ResidentialUnitManagerService,
            useValue: {
              save: serviceMock
            }
          }
        ]
      });

      const inputData = {
        name: 'Andrea',
        lastname: 'Gutierrez',
        documentType: DocumentType.Passport,
        document: '1152202144',
        password: 'andrea1993?',
        tower: '1',
        building: '1828',
        email: 'andrea@gmail.com',
        phone: '3234324324'
      }

      let input = screen.getByTestId('name');
      await user.type(input, 'Andrea');

      input = screen.getByTestId('lastname');
      await user.type(input, 'Gutierrez');

      input = screen.getByTestId('documentType');
      await user.selectOptions(input, DocumentType.Passport);

      input = screen.getByTestId('document');
      await user.type(input, '1152202144');

      input = screen.getByTestId('password');
      await user.type(input, 'andrea1993?');

      input = screen.getByTestId('tower');
      await user.type(input, '1');

      input = screen.getByTestId('building');
      await user.type(input, '1828');

      input = screen.getByTestId('email');
      await user.type(input, 'andrea@gmail.com');

      input = screen.getByTestId('phone');
      await user.type(input, '3234324324');

      const button = screen.getByRole('button', {name: /Guardar/i});
      await user.click(button);

      await waitFor(() => expect(screen.queryByText(/Fue guardado con éxito/i)).toBeVisible());
      expect(serviceMock).toHaveBeenCalledWith(inputData);
    });

    it('should not let save if the form is not valid', async () => {
      const submit = jest.fn();
      await render(FormComponent, {
        ...componentProviders,
        componentProperties: {
          onSave: submit
        }
      });

      const buttonSave = screen.getByRole('button', {name: /Guardar/i});
      await user.click(buttonSave);

      expect(submit).not.toHaveBeenCalled();
    });
  });
});

const providers = [
  NgbActiveModal,
  provideHttpClient()
];

const componentProviders = {
  providers: [...providers],
  componentProperties: {
    modalTitle: 'Nuevo Administrador',
  }
}
