export interface ResidentialOwner {
  id: string;
  name: string;
  lastname: string;
  documentType: string;
  document: string;
  password: string;
  building: string;
  tower: string;
  email: string;
  phone: string;
}

export type ResidentialOwnerDto = Omit<ResidentialOwner, 'id'>;
