// store/reducers/loading.ts
import { SET_LOADING } from '../types';

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

export default function loadingReducer(state = initialState, action: any): LoadingState {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
