import { RolesEnum } from '../constants/enum/RolesEnum';

export interface INavbarRoute {
  name: string;
  path: string;
  requiredAuth: boolean;
  role?: RolesEnum[];
  hideOnAuth?: boolean;
}
