export interface INavbarRoute {
  name: string;
  path: string;
  requiredAuth: boolean;
  hideOnAuth?: boolean;
}
