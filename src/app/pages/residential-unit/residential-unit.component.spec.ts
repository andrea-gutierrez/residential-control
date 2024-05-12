import '@testing-library/jest-dom';

import {fireEvent, render} from "@testing-library/angular";
import {screen} from '@testing-library/dom';
import {faker} from "@faker-js/faker";

import {of} from "rxjs";
import {provideHttpClient} from "@angular/common/http";

import {ResidentialUnitComponent} from './residential-unit.component';
import {ResidentialUnit} from "./residentialUnit.interface";
import {ResidentialUnitService} from "./residential-unit.service";

describe('ResidentialUnitComponent', () => {
  it('should show the button "Nuevo"', async () => {
    await render(ResidentialUnitComponent, {
      providers: [
        provideHttpClient(),
        {
          provide: ResidentialUnitService,
          useValue: {
            getAll: of([]),
          }
        }
      ]
    });

    const buttonNew = screen.getByRole('button', {name: 'Nuevo'});

    expect(buttonNew).toBeVisible();
  });

  it('should open a modal with the title "Nueva Unidad Residencial"', async () => {
    await render(ResidentialUnitComponent, {
      providers: [
        provideHttpClient()
      ]
    });

    const buttonNew = screen.getByRole('button', {name: 'Nuevo'});
    fireEvent.click(buttonNew);

    expect(screen.getByRole('heading', {name: 'Nueva Unidad Residencial'})).toBeVisible();
  });

  it('should render all the residential unit that exist', async () => {
    const residentialUnitList: ResidentialUnit[] = [
      {
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
      },
      {
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
      },
      {
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
      }
    ];
    await render(ResidentialUnitComponent, {
      providers: [
        provideHttpClient(),
      ],
      componentProviders: [
        {
          provide: ResidentialUnitService,
          useValue: {
            getAll() {
              return of({
                result: residentialUnitList
              })
            },
          }
        }
      ]
    });

    const totalRows = screen.getAllByRole('row');

    expect(totalRows.length - 1).toEqual(residentialUnitList.length);
  });
});
