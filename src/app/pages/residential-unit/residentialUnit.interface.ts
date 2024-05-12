import {FormControl} from '@angular/forms';

export interface ResidentialUnit {
  nombre: string;
  address: string;
  pais: string;
  ciudad: string;
  departamento: string;
  zoneCode: string;
  mobileAdmin: string;
  emailAdmin: string;
  empresaVigilancia: string;
  nitEmpresaVigilancia: string;
  registroInmobiliario: string;
  id: string;
}

export type UnidadResidencialDTO = Omit<ResidentialUnit, "id">
