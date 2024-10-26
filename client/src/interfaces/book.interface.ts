import { Nullable } from "../constants/constants";

export interface IBook {
  id: Nullable<number>;
  title: string;
  price: number;
  isOffer: boolean;
  stock: number;
  imageUrl: string;
  isNew: boolean;
  author: string;
}
