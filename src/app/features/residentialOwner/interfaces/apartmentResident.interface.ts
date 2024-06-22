export interface ApartmentResident {
  apartment: string;
  document: string;
  documentType: string;
  email: string;
  id: string;
  isActive: boolean;
  lastname: string;
  name: string;
  password: string;
  phone: string;
  plate: string;
  qrId: string;
  role: string;
  tower: string;
  vehicleActive: boolean;
  vehicleType: string;
}

export type ApartmentResidentDto = Omit<ApartmentResident, 'id'>;
