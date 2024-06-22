export enum DocumentType {
  CC = 'cc',
  ForeignerId = 'cedula_ciudadania',
  Passport = 'passport',
  CivilRegister = 'civil_register',
}

export const DocumentTypeMapping: Record<DocumentType, string> = {
  [DocumentType.CC]: 'Cédula de ciudadanía',
  [DocumentType.ForeignerId]: 'Cédula de extranjería',
  [DocumentType.Passport]: 'Pasaporte',
  [DocumentType.CivilRegister]: 'Registro civil',
};
