import { IBook } from '../../interfaces/book.interface';
import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from '../types';

interface CartState {
  cartItems: IBook[];
  totalPrice: number;
}

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
};

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        return state;
      }
      const updatedCartItems = [...state.cartItems, action.payload];
      const newTotalPrice = state.totalPrice + (action.payload.price ?? 0);

      return {
        ...state,
        cartItems: updatedCartItems,
        totalPrice: newTotalPrice,
      };

    case REMOVE_FROM_CART:
      const filteredCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id,
      );
      const removedItem = state.cartItems.find(
        (item) => item.id === action.payload.id,
      );
      const updatedTotalPrice = state.totalPrice - (removedItem?.price ?? 0);

      return {
        ...state,
        cartItems: filteredCartItems,
        totalPrice: updatedTotalPrice,
      };

    case CLEAR_CART:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default cartReducer;
