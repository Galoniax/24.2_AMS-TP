import { Nullable } from '../constants/constants';

export interface IBook {
  id: Nullable<number>;
  title: string;
  price: Nullable<number>;
  isOffer: boolean;
  stock: Nullable<number>;
  imageUrl: string;
  isNew: boolean;
  author: string;
  categoryId: Nullable<number>;
}
