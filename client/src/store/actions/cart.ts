// src/store/actions/cartActions.ts
import { IBook } from "../../interfaces/book.interface";
import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../types";

export const addToCart = (book: IBook) => ({
  type: ADD_TO_CART,
  payload: book,
});

export const removeFromCart = (bookId: number) => ({
  type: REMOVE_FROM_CART,
  payload: { id: bookId },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
