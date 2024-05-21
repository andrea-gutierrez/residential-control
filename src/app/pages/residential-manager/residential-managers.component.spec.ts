import '@testing-library/jest-dom';

import {provideHttpClient} from "@angular/common/http";
import {of} from "rxjs";

import {fireEvent, render, within} from "@testing-library/angular";
import {screen} from '@testing-library/dom';
import {fa, faker} from '@faker-js/faker';

import {ResidentialManagersComponent} from './residential-managers.component';
import {ResidentialUnitAdmins} from "./model/residentialManagers.model";
import {ResidentialUnitManagerService} from "./service/residential-unit-manager.service";

describe('ResidentialManagersComponent', () => {
  it('should show the button "Nuevo"', async () => {
    await render(ResidentialManagersComponent, {
      ...generalProviders,
      componentProviders: [
        {
          provide: ResidentialUnitManagerService, useValue: {
            getAll() {
              return of({
                result: []
              })
            }
          }
        }
      ]
    });
    expect(screen.getByText('Nuevo')).toBeInTheDocument();
  });

  it('should open a modal with the title "Nuevo Administrador" when button "Nuevo" clicked', async () => {
    await render(ResidentialManagersComponent, {
      ...generalProviders,
      componentProviders: [
        {
          provide: ResidentialUnitManagerService, useValue: {
            getAll() {
              return of({
                result: []
              })
            }
          }
        }
      ]
    });
    const buttonNew = screen.getByText('Nuevo');
    fireEvent.click(buttonNew);

    expect(screen.getByText('Nuevo Administrador')).toBeVisible();
  });

  it('should open a modal with the title "Editar Administrador" when button "Editar" clicked', async () => {
    await render(ResidentialManagersComponent, {
      ...generalProviders,
      componentProviders: [
        {
          provide: ResidentialUnitManagerService, useValue: {
            getAll() {
              return of({
                result: [{
                  name: 'Catalina',
                  lastname: 'Guirales',
                  document: '34343243',
                  document_type: 'CC',
                  password: '3423jflkds',
                  id: 'fjdlsfs',
                  tower: '3',
                  building: '32'
                }]
              })
            }
          }
        }
      ]
    });

    const row = screen.getByRole('row', {name: /Catalina/i}).closest('tr');
    fireEvent.click(within(row!).getByText('Editar'));

    expect(screen.getByRole('heading', {name: 'Editar Administrador'})).toBeVisible();
  });

  it('should render all the admin in the table', async () => {
    const adminList: ResidentialUnitAdmins[] = [
      {
        lastname: faker.person.lastName(),
        document: faker.string.numeric({length: 10, allowLeadingZeros: false}),
        name: faker.person.firstName(),
        password: faker.internet.password(),
        document_type: faker.helpers.arrayElement(['CC', 'TI']),
        id: faker.string.uuid(),
        building: faker.string.numeric(),
        tower: faker.string.numeric()
      },
      {
        lastname: faker.person.lastName(),
        document: faker.string.numeric({length: 10, allowLeadingZeros: false}),
        name: faker.person.firstName(),
        password: faker.internet.password(),
        document_type: faker.helpers.arrayElement(['CC', 'TI']),
        id: faker.string.uuid(),
        building: faker.string.numeric(),
        tower: faker.string.numeric()
      }
    ];

    await render(ResidentialManagersComponent, {
      providers: [
        provideHttpClient(),
      ],
      componentProviders: [
        {
          provide: ResidentialUnitManagerService, useValue: {
            getAll() {
              return of({
                result: [...adminList]
              })
            }
          }
        }
      ]
    });
    const totalRows = screen.getAllByRole('row');

    expect(totalRows.length - 1).toEqual(adminList.length);
  });

  it('should show "No hay administradores" as a message instead of the table when there is no data', async () => {
    await render(ResidentialManagersComponent, {
      ...generalProviders,
      componentProviders: [
        {
          provide: ResidentialUnitManagerService, useValue: {
            getAll: () => of({result: [] })
          }
        }
      ]
    });

    const emptyMessage = screen.getByText('No hay administradores');

    expect(emptyMessage).toBeInTheDocument();
  });
});

const generalProviders = {
  providers: [
    provideHttpClient(),
  ],
}

const generateResidentialAdminList = (length = 1): ResidentialUnitAdmins[] => {
  let temporalAdminList: ResidentialUnitAdmins[] = [];
  for (let i = 0; i < length; i++) {
    temporalAdminList.push({
      tower: faker.string.numeric(),
      building: faker.string.numeric(),
      name: faker.person.firstName(),
      id: faker.string.uuid(),
      document: faker.string.numeric({length: 10}),
      lastname: faker.person.lastName(),
      document_type: faker.helpers.arrayElement(['CC', 'ID']),
      password: faker.string.numeric({length: 8})
    })
  }
  return temporalAdminList;
}
