import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import {screen, render} from "@testing-library/angular";

import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import {FormComponent} from "./form.component";

describe('FormComponent Apartment owners', () => {
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

  describe('input Nombre unit testing', () => {
    it('should display "Solo se pueden ingresar letras" when the nombre input has numbers', async () => {
      await render(FormComponent, componentProviders);

      const nameInput = screen.getByLabelText(/nombre/i);
      await userEvent.type(nameInput, 'Andrea43');

      expect(screen.getByText('Solo puede ingresar letras')).toBeVisible();
    });

    it('should display "El nombre es requerido" when the name is valid and then empty', async () => {
      const user = userEvent.setup();
      await render(FormComponent, componentProviders);

      let nameInput = screen.getByLabelText(/nombre/i);
      await user.type(nameInput, 'Andrea43');

      nameInput = screen.getByLabelText(/nombre/i);
      await user.clear(nameInput);

      expect(screen.getByText('El nombre es requerido')).toBeVisible();
    });

    it('should display "Solo se puede ingresar letras" when the name has special characters', async () => {
      await render(FormComponent, componentProviders);

      const nameInput = screen.getByLabelText(/nombre/i);
      await userEvent.type(nameInput, 'Andre´a');

      expect(screen.getByText('Solo puede ingresar letras')).toBeVisible();
    });

    it('should not display any message when the name is correct', async () => {
      await render(FormComponent, componentProviders);

      const nameInput = screen.getByLabelText(/nombre/i);
      await userEvent.type(nameInput, 'Edison');

      expect(screen.queryByText('Solo puede ingresar letras')).toBeNull();
      expect(screen.queryByText('El nombre es requerido')).toBeNull();
    });
  });

  describe('input Apellido unit testing', () => {
    it('should display an error message when empty: "El apellido es requerido"', async () => {
      await render(FormComponent, componentProviders);

      const saveButton = screen.getByRole('button', {name: /guardar/i});
      await userEvent.click(saveButton);

      expect(screen.getByText('El apellido es requerido')).toBeInTheDocument();
    });

    it('should display an error when the Apellido has numbers', async () => {
      await render(FormComponent, componentProviders);

      const nameInput = screen.getByLabelText(/apellido/i);
      await userEvent.type(nameInput, 'Gut6ierrez');

      expect(screen.getByText('Solo puede ingresar letras'));
    });

    it('should display an error when the Apellido has special characters', async () => {
      await render(FormComponent, componentProviders);

      const nameInput = screen.getByLabelText(/apellido/i);
      await userEvent.type(nameInput, 'Gutiérrez');

      expect(screen.getByText('Solo puede ingresar letras'));
    });
  });

  describe('input Tipo de documento unit testing', () => {
    it('should display an error message when empty: "El tipo de documento es requerido"', async () => {
      await render(FormComponent, componentProviders);

      const saveButton = screen.getByRole('button', {name: /guardar/i});
      await userEvent.click(saveButton);

      expect(screen.getByText('El tipo de documento es requerido')).toBeInTheDocument();
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
