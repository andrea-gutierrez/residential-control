import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

import {provideHttpClient} from "@angular/common/http";
import {of} from "rxjs";

import {fireEvent, render, waitFor, within} from "@testing-library/angular";
import {screen} from '@testing-library/dom';
import {faker} from '@faker-js/faker';

import {ResidentialManagersComponent} from './residential-managers.component';
import {ResidentialUnitAdmins} from "./model/residentialManagers.model";
import {ResidentialUnitManagerService} from "./service/residential-unit-manager.service";

const user = userEvent.setup();
describe('ResidentialManagersComponent', () => {
  it('should show the button "Nuevo"', async () => {
    await render(ResidentialManagersComponent, {
      ...generalProviders
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
    const managerList = generateResidentialAdminList();
    await render(ResidentialManagersComponent, {
      ...generalProviders,
      componentProviders: [
        {
          provide: ResidentialUnitManagerService, useValue: {
            getAll() {
              return of({
                result: [...managerList]
              })
            }
          }
        }
      ]
    });
    const managerName = new RegExp(managerList[0].name, 'i');
    const row = screen.getByRole('row', {name: managerName}).closest('tr');
    fireEvent.click(within(row!).getByText('Editar'));

    expect(screen.getByRole('heading', {name: 'Editar Administrador'})).toBeVisible();
  });

  it('should render all the admin in the table', async () => {
    const managerList: ResidentialUnitAdmins[] = generateResidentialAdminList(4);

    await render(ResidentialManagersComponent, {
      ...generalProviders,
      componentProviders: [
        {
          provide: ResidentialUnitManagerService, useValue: {
            getAll() {
              return of({
                result: [...managerList]
              })
            }
          }
        }
      ]
    });
    const totalRows = screen.getAllByRole('row');

    expect(totalRows.length - 1).toEqual(managerList.length);
  });

  it('should show "No hay administradores" as a message instead of the table when there is no data', async () => {
    await render(ResidentialManagersComponent, {
      ...generalProviders
    });

    const emptyMessage = screen.getByText('No hay administradores');

    expect(emptyMessage).toBeInTheDocument();
  });

  describe('delete a manager', () => {
    beforeEach(async () => {
      window.scrollTo = jest.fn();
    });

    it('should show a pup up to ensure the user want to delete the manager', async () => {
      const managerList = generateResidentialAdminList(5);
      await render(ResidentialManagersComponent, {
        ...generalProviders,
        componentProviders: [
          ...componentProviders,
          {
            provide: ResidentialUnitManagerService, useValue: {
              getAll: () => of({result: [...managerList]})
            }
          }
        ]
      });

      const managerName = new RegExp(managerList[0].name, 'i');
      const row = screen.getByRole('row', {name: managerName}).closest('tr');
      await user.click(within(row!).getByRole('button', {name: /delete/i}));

      await waitFor(() => expect(screen.getByText('Estás seguro de eliminar a')).toBeVisible());
    });

    it('should delete the element when clicked in the button "Delete"', async () => {
      const managerList = generateResidentialAdminList(5);
      const serviceMockDelete = jest.fn().mockImplementationOnce(() => of({success: true}));
      const serviceMockGetAll = jest.fn()
        .mockImplementationOnce(() => of({result: [...managerList]}))
        .mockImplementationOnce(() => {
          return of({result: [...managerList.filter((_v, index) => index !== 0)]})
        });
      await render(ResidentialManagersComponent, {
        ...generalProviders,
        componentProviders: [
          ...componentProviders,
          {
            provide: ResidentialUnitManagerService, useValue: {
              getAll: serviceMockGetAll,
              deleteById: serviceMockDelete,
            }
          },
        ]
      });

      const managerName = new RegExp(managerList[0].name, 'i');
      let row = screen.getByRole('row', {name: managerName}).closest('tr');

      await user.click(within(row!).getByRole('button', {name: /delete/i}));

      const buttonYes = screen.getByRole('button', {name: 'Si'});
      await user.click(buttonYes);

      const buttonOk = screen.getByRole('button', {name: 'OK'});
      await user.click(buttonOk);

      const rowDeleted = screen.queryByRole('row', {name: managerName});
      const totalRows = screen.getAllByRole('row');

      expect(rowDeleted).toBeNull();
      expect(totalRows.length - 1).toEqual(managerList.length - 1);
      expect(serviceMockDelete).toHaveBeenCalled();
    });
  });
});

const componentProviders = [
  {
    provide: ResidentialUnitManagerService, useValue: {
      getAll: () => of({result: []})
    }
  }
];

const generalProviders = {
  providers: [
    provideHttpClient(),
  ],
  componentProviders: [...componentProviders]
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
