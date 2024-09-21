import { IValidatorsModel } from '../interfaces/validator.interface';

export const isEmailValid = (email: string): IValidatorsModel => {
  if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
    return {
      errorMessage: 'Ingrese un mail válido',
      hasError: true,
    };
  } else if (!/\.[A-Za-z]{2,}$/.test(email)) {
    return {
      errorMessage: 'El dominio del correo electrónico debe ser válido',
      hasError: true,
    };
  } else {
    return {
      hasError: false,
    };
  }
};

export const isFullnameValid = (fullname: string): IValidatorsModel => {
  if (!/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/.test(fullname)) {
    return {
      errorMessage: 'El nombre debe contener solo letras y espacios',
      hasError: true,
    };
  } else if (!/\s/.test(fullname)) {
    return {
      errorMessage:
        'Debe ingresar el nombre y apellido separados por un espacio',
      hasError: true,
    };
  } else {
    return {
      hasError: false,
    };
  }
};

export const isPhoneValid = (phone: string): IValidatorsModel => {
  if (!/^\d+$/.test(phone)) {
    return {
      errorMessage: 'Ingrese un número de teléfono válido',
      hasError: true,
    };
  } else if (phone.length < 7 || phone.length > 11) {
    return {
      errorMessage:
        'Ingrese un teléfono válido. El número debe tener entre 7 y 11 dígitos. Si es de otro país, coloque su código de area en el mensaje',
      hasError: true,
    };
  } else {
    return {
      hasError: false,
    };
  }
};

export const isSubjectValid = (subject: string): IValidatorsModel => {
  const subjectV = subject;
  if (!/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/.test(subjectV)) {
    return {
      errorMessage: 'El asunto debe contener solo letras y espacios',
      hasError: true,
    };
  } else {
    return {
      hasError: false,
    };
  }
};

export const isMessageValid = (message: string): IValidatorsModel => {
  if (message === '') {
    return {
      errorMessage: 'Ingrese un mensaje',
      hasError: true,
    };
  } else {
    return {
      hasError: false,
    };
  }
};
