import {FormControl} from '@angular/forms';

export interface UnidadResidencial {
  nombre: string;
  direccion: string;
  pais: string;
  ciudad: string;
  departamento: string;
  codigoPostal: number;
  telefonoAdmon: number;
  emailAdmon: string;
  empresaVigilancia: string;
  nitEmpresaVigilancia: string;
  registroInmobiliario: string;
  id: string;
}

export type UnidadResidencialDTO = Omit<UnidadResidencial, "id">

type ToFormControls<T> = {
  [K in keyof T]: FormControl<T[K]>;
};

export type UnidadResidencialForm = ToFormControls<UnidadResidencialDTO>;
