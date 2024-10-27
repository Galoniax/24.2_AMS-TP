import { AnyAction } from "redux";
import { Dispatch } from "redux";
import { USER_LOGOUT_FAIL, USER_LOGOUT_SUCCESS } from "../types";
import { toast } from "react-toastify";
import { removeLs } from "../../services/localStorageService";
import { persistor } from "../../store";

export const userLogoutSuccess = () => {
  removeLs();
  return {
    type: USER_LOGOUT_SUCCESS,
  };
};

export const userLogoutFail = () => {
  return {
    type: USER_LOGOUT_FAIL,
  };
};

export const logout = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    console.log("LOGOUT");
    await persistor.purge();
    dispatch(userLogoutSuccess());
    toast.warning("Has cerrado sesión");
  } catch (error) {
    dispatch(userLogoutFail());
    toast.error("Error al cerrar sesión");
  }
};
