import { toast } from "react-toastify";
import { firebase, db } from "../../firebase/firebase.config";
import { Dispatch } from "redux";
import { USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from "../types";
import { RolesEnum } from "../../models/enums/roles.enum";

export const registerWithEmail = ({
  displayName,
  email,
  password,
  rol,
}: {
  displayName: string;
  email: string;
  password: string;
  rol: RolesEnum;
}) => {
  return (dispatch: Dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user !== null) {
          const uid = result.user.uid;
          const userRef = db.collection("usuarios").doc(uid);

          userRef.set({
            uid,
            email,
            rol: rol,
            displayName,
          });

          userRef.get().then((doc) => {
            if (doc.exists) {
              const user = doc.data();
              if (user !== undefined && result.user !== null) {
                dispatch({
                  type: USER_REGISTER_SUCCESS,
                  payload: {
                    uid: result.user.uid,
                    email: result.user.email,
                    rol: user.rol,
                    displayName,
                  },
                });
                toast.success("Usuario registrado con éxito.");
              } else {
                dispatch({
                  type: USER_REGISTER_FAIL,
                });
                toast.error("Error al registrar usuario");
              }
            } else {
              toast.error("El usuario ya existe");
            }
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: error.message,
        });
        toast.error("Error al registrar usuario");
      });
  };
};
