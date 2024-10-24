import { legacy_createStore as createStore, applyMiddleware, Action, combineReducers } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./store/reducers/auth";
import { useDispatch as useReduxDispatch } from 'react-redux';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user_data", "isAuthenticated"],
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();

export default store;
