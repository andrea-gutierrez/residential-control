import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import {screen, render} from "@testing-library/angular";

import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import {FormComponent} from "./form.component";

describe('FormComponent Apartment owners', () => {
  const user = userEvent.setup();

  it('should show "Nuevo Administrador" as a title', async () => {
    await render(FormComponent, {
      providers: [
        NgbActiveModal
      ],
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

      expect(screen.queryByText('El nombre es requerido')).toBeNull();
    });

    it('should display "El nombre no puede contener números" when the input has numbers', async () => {
      await render(FormComponent, componentProviders);

      const nameInput = screen.getByLabelText(/nombre/i);
      await userEvent.type(nameInput, 'Andrea43');

      expect(screen.getByText('El nombre no puede contener números')).toBeVisible();
    });

    it('should display "El nombre es requerido" when the input is empty after dirty', async () => {
      await render(FormComponent, componentProviders);

      let nameInput = screen.getByLabelText(/nombre/i);
      await user.type(nameInput, 'Andrea43');

      nameInput = screen.getByLabelText(/nombre/i);
      await user.clear(nameInput);

      expect(screen.getByText('El nombre es requerido')).toBeVisible();
    });

    it('should display "El nombre no puede contener caracteres especiales" when the input has special characters', async () => {
      await render(FormComponent, componentProviders);

      const nameInput = screen.getByLabelText(/nombre/i);
      await userEvent.type(nameInput, 'Andre´a');

      expect(screen.getByText('El nombre no puede contener caracteres especiales')).toBeVisible();
    });

    it('should not display any message when the input is valid', async () => {
      await render(FormComponent, componentProviders);

      const nameInput = screen.getByLabelText(/nombre/i);
      await user.type(nameInput, 'Edison');

      expect(screen.queryByText('Solo puede ingresar letras')).toBeNull();
      expect(screen.queryByText('El nombre es requerido')).toBeNull();
    });
  });

  describe('input Apellido', () => {
    it('should not display any error message when the input has not been dirty', async () => {
      await render(FormComponent, componentProviders);

      expect(screen.queryByText('El apellido es requerido')).toBeNull();
    });

    it('should display "El apellido es requerido" when the input is empty after dirty', async () => {
      await render(FormComponent, componentProviders);

      let nameInput = screen.getByLabelText(/apellido/i);
      await user.type(nameInput, 'Andrea43');

      nameInput = screen.getByLabelText(/apellido/i);
      await user.clear(nameInput);

      expect(screen.getByText('El apellido es requerido')).toBeVisible();
    });

    it('should display an error when the Apellido has numbers', async () => {
      await render(FormComponent, componentProviders);

      const nameInput = screen.getByLabelText(/apellido/i);
      await user.type(nameInput, 'Gut6ierrez');

      expect(screen.getByText('El apellido no puede contener números')).toBeVisible();
    });

    it('should display an error when the Apellido has special characters', async () => {
      await render(FormComponent, componentProviders);

      const nameInput = screen.getByLabelText(/apellido/i);
      await user.type(nameInput, 'Gutiérrez');

      expect(screen.getByText('El apellido no puede contener caracteres especiales')).toBeVisible();
    });

    it('should not display any error message when the input is valid', async () => {
      await render(FormComponent, componentProviders);

      const nameInput = screen.getByLabelText(/apellido/i);
      await user.type(nameInput, 'Giraldo');

      expect(screen.queryByText('Solo puede ingresar letras')).toBeNull();
    });
  });

  describe('input Tipo de documento', () => {
    it('should display an error message when empty: "El tipo de documento es requerido"', async () => {
      await render(FormComponent, componentProviders);

      let documentType = screen.getByLabelText(/Tipo de Documento/i);
      await user.selectOptions(documentType, 'cc');

      documentType = screen.getByLabelText(/Tipo de Documento/i);
      await user.selectOptions(documentType, '');

      expect(screen.getByText('El tipo de documento es requerido')).toBeVisible();
    });

    it('should not display an error when an option selected in the "Tipo de documento"', async () => {
      await render(FormComponent, componentProviders);

      let documentType = screen.getByLabelText(/tipo de documento/i);
      await user.selectOptions(documentType, 'cedulaExtranjeria');

      expect(screen.queryByText("El tipo de documento es requerido")).toBeNull();
    });
  });

  describe('input Documento', () => {
    it('should display an error message when empty: "El documento es requerido"', async () => {
      await render(FormComponent, componentProviders);

      let document = screen.getByTestId('document');
      await user.type(document, '12323435332');

      document = screen.getByTestId('document');
      await user.clear(document);

      expect(screen.getByText('El documento es requerido')).toBeVisible();
    });

    it('should display an error message when the document length is not between 8 and 10 characters', async () => {
      await render(FormComponent, componentProviders);

      let document = screen.getByTestId('document');
      await user.type(document, '1232');

      expect(screen.getByText('El número de caracteres del documento debe estar entre 8 y 10')).toBeVisible();

      document = screen.getByTestId('document');
      await user.type(document, '12349343234');

      expect(screen.getByText('El número de caracteres del documento debe estar entre 8 y 10')).toBeVisible();
    });

    it('should display "No puede tener caracteres especiales" when the input has special characters', async () => {
      await render(FormComponent, componentProviders);

      const document = screen.getByTestId('document');
      await user.type(document, '12321234.');

      expect(screen.getByText('El documento no puede contener caracteres especiales')).toBeVisible();
    });
  });
});

const componentProviders = {
  providers: [
    NgbActiveModal,
  ],
  componentProperties: {
    modalTitle: 'Nuevo Administrador',
  }
}
