import { Role } from '@shared/enums/roles.interface';
import { NavBar } from '@shared/interfaces/navBar.interface';

export const menuListByRole: NavBar[] = [
  {
    role: Role.ADMIN,
    item: [
      {
        name: 'Propietarios',
        url: '/admin/residential-owner',
      },
    ],
  },
  {
    role: Role.OWNER,
    item: [
      {
        name: 'Residente',
        url: '/owner/resident',
      },
    ],
  },
];
