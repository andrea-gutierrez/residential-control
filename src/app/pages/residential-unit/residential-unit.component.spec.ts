import '@testing-library/jest-dom';

import {fireEvent, render, within} from "@testing-library/angular";
import {screen} from '@testing-library/dom';
import {faker} from "@faker-js/faker";

import { throwError } from 'rxjs';

import {of} from "rxjs";
import {provideHttpClient} from "@angular/common/http";

import {ResidentialUnitComponent} from './residential-unit.component';
import {ResidentialUnit} from "./residentialUnit.interface";
import {ResidentialUnitService} from "./residential-unit.service";

describe('ResidentialUnitComponent', () => {
  it('should show the button "Nuevo"', async () => {
    await render(ResidentialUnitComponent, {
      componentProviders: [
        {
          provide: ResidentialUnitService,
          useValue: {
            getAll() {
              return of({
                result: []
              })
            },
          }
        }
      ],
      ...generalProviders
    });

    const buttonNew = screen.getByRole('button', {name: 'Nuevo'});

    expect(buttonNew).toBeVisible();
  });

  it('should open a modal with the title "Nueva Unidad Residencial" when the button "Nuevo" clicked', async () => {
    await render(ResidentialUnitComponent, {
      componentProviders: [
        {
          provide: ResidentialUnitService,
          useValue: {
            getAll() {
              return of({
                result: []
              })
            },
          }
        }
      ],
      ...generalProviders
    });

    const buttonNew = screen.getByRole('button', {name: 'Nuevo'});
    fireEvent.click(buttonNew);

    expect(screen.getByRole('heading', {name: 'Nueva Unidad Residencial'})).toBeVisible();
  });

  it('should render all the residential unit that exist', async () => {
    const residentialUnitList: ResidentialUnit[] = generateResidentialUnitList(5);
    await render(ResidentialUnitComponent, {
      componentProviders: [
        {
          provide: ResidentialUnitService,
          useValue: {
            getAll() {
              return of({
                result: [...residentialUnitList]
              })
            },
          }
        }
      ],
      ...generalProviders
    });

    const totalRows = screen.getAllByRole('row');

    expect(totalRows.length - 1).toEqual(residentialUnitList.length);
  });

  it('should show an error message when there is not data to show in the table', async () => {
    await render(ResidentialUnitComponent, {
      componentProviders: [
        {
          provide: ResidentialUnitService,
          useValue: {
            getAll() {
              return of({
                result: []
              })
            },
          }
        }
      ],
      ...generalProviders
    });

    const emptyMessage = screen.getByText('No hay unidades residenciales');

    expect(emptyMessage).toBeInTheDocument();

  });

  it('should delete the element when clicked the button "delete" inside the table', async () => {
    const residentialUnitList: ResidentialUnit[] = generateResidentialUnitList(10);
    await render(ResidentialUnitComponent, {
      componentProviders: [
        {
          provide: ResidentialUnitService,
          useValue: {
            getAll() {
              return of({
                result: [...residentialUnitList]
              })
            },
          }
        }
      ],
      ...generalProviders
    });

    const residentialUnitAdminName = new RegExp(residentialUnitList[0].emailAdmin, 'i');

    const row = screen.getByRole('row', {name: residentialUnitAdminName}).closest('tr');
    fireEvent.click(within(row!).getByText('Eliminar'));

    const rowDeleted = screen.queryByRole('row', {name: residentialUnitAdminName});
    const totalRows = screen.getAllByRole('row');

    expect(rowDeleted).toBeNull();
    expect(totalRows.length - 1).toEqual(residentialUnitList.length - 1);
  })

  it('should show an alert message if there is any uncontrollable error', async () => {
    await render(ResidentialUnitComponent, {
      componentProviders: [
        {
          provide: ResidentialUnitService,
          useValue: {
            getAll() {
              return throwError(() => new Error('test'));
            },
          }
        }
      ],
      ...generalProviders
    });

    const message = screen.getByText('Hubo un error', { exact: false});

    expect(message).toBeInTheDocument();
  });
});

function generateResidentialUnitList(length = 1): ResidentialUnit[] {
  let temporalResidentialList = [];
  for (let i = 0; i < length; i++) {
    temporalResidentialList.push({
      emailAdmin: faker.internet.email(),
      ciudad: faker.location.city(),
      zoneCode: faker.location.zipCode(),
      address: faker.location.streetAddress(),
      pais: faker.location.county(),
      nombre: faker.company.name(),
      departamento: faker.location.city(),
      id: faker.string.uuid(),
      empresaVigilancia: faker.company.name(),
      nitEmpresaVigilancia: faker.string.numeric({length: 8}),
      mobileAdmin: faker.string.numeric({length: 10}),
      registroInmobiliario: faker.string.numeric({length: 10})
    });
  }
  return temporalResidentialList;
}

const generalProviders = {
  providers: [
    provideHttpClient(),
  ]
}
