import { AnyAction } from "redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { Dispatch } from "redux";
import { USER_LOGOUT_FAIL, USER_LOGOUT_SUCCESS } from "../types";
import { toast } from "react-toastify";

export const userLogoutSuccess = () => {
  localStorage.removeItem("user_data");
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
    await signOut(auth);
    dispatch(userLogoutSuccess());
    toast.warning("Has cerrado sesión");
  } catch (error) {
    dispatch(userLogoutFail());
    toast.error("Error al cerrar sesión");
  }
};
