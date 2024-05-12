import '@testing-library/jest-dom';

import {fireEvent, render, within} from "@testing-library/angular";
import {screen} from '@testing-library/dom';

import { faker } from '@faker-js/faker';

import {ResidentialAdmonsComponent} from './residential-admons.component';
import {ResidentialUnitAdmins} from "./residentialAdmons.interface";

describe('ResidentialAdmonsComponent', () => {
  it('should show the button "Nuevo"', async () => {
    await render(ResidentialAdmonsComponent);
    expect(screen.getByText('Nuevo')).toBeInTheDocument();
  });

  it('should open a modal with the title "Nuevo Administrador" when button "Nuevo" clicked', async () => {
    await render(ResidentialAdmonsComponent);
    const buttonNew = screen.getByText('Nuevo');
    fireEvent.click(buttonNew);

    expect(screen.getByText('Nuevo Administrador')).toBeVisible();
  });

  it('should open a modal with the title "Editar Administrador" when button "Editar" clicked', async () => {
    await render(ResidentialAdmonsComponent);

    const row = screen.getByRole('row', {name: /Catalina/i}).closest('tr');
    fireEvent.click(within(row!).getByText('Editar'));

    expect(screen.getByRole('heading', {name: 'Editar Administrador'})).toBeVisible();
  });

  it('should delete the admin when the button "Eliminar" clicked', async () => {
    await render(ResidentialAdmonsComponent);

    const row = screen.getByRole('row', {name: /Catalina/i}).closest('tr');
    fireEvent.click(within(row!).getByText('Eliminar'));

    const rowDeleted = screen.queryByRole('row', {name: /Catalina/i});

    expect(rowDeleted).toBeNull();
  });

  it('should render all the admin in the table', async () => {
    const adminList: ResidentialUnitAdmins[] = [
      {
        email: faker.internet.email(),
        celular: faker.string.numeric({length: 10, allowLeadingZeros: false}),
        apellido: faker.person.lastName(),
        documento: faker.string.numeric({length: 10, allowLeadingZeros: false}),
        nombre: faker.person.firstName(),
        password: faker.internet.password(),
        usuario: faker.internet.userName(),
        tipoDocumento: faker.helpers.arrayElement(['CC', 'TI']),
        id: faker.string.uuid()
      },
      {
        email: faker.internet.email(),
        celular: faker.string.numeric({length: 10, allowLeadingZeros: false}),
        apellido: faker.person.lastName(),
        documento: faker.string.numeric({length: 10, allowLeadingZeros: false}),
        nombre: faker.person.firstName(),
        password: faker.internet.password(),
        usuario: faker.internet.userName(),
        tipoDocumento: faker.helpers.arrayElement(['CC', 'TI']),
        id: faker.string.uuid()
      }
    ];

    await render(ResidentialAdmonsComponent);
    const totalRows = screen.getAllByRole('row');

    expect(totalRows.length - 1).toEqual(adminList.length);
  });
});
