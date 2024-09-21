import { useState } from 'react';
import { isEmailValid, isPasswordValid } from '../../utils/Validators';
import {
  FaCalendarAlt,
  FaEnvelope,
  FaIdCard,
  FaLock,
  FaUser,
} from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import Button from '../../components/button/Button';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [dni, setDni] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState<string | undefined>('');
  const [passwordError, setPasswordError] = useState<string | undefined>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const isFormComplete =
    email &&
    username &&
    dni &&
    birthDate &&
    password &&
    confirmPassword &&
    !emailError &&
    !passwordError &&
    !confirmPasswordError;

  const handleSubmit = () => {
    if (isFormComplete) {
      console.log('Datos del formulario:', {
        email,
        username,
        dni,
        birthDate,
        password,
      });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const validation = isEmailValid(value);
    setEmailError(validation.hasError ? validation.errorMessage : '');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const validation = isPasswordValid(value);
    setPasswordError(validation.hasError ? validation.errorMessage : '');
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(
      value !== password ? 'Las contraseñas no coinciden.' : '',
    );
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-slate-100">
      <div
        className="bg-white shadow-lg rounded-lg p-8 w-[40%]"
        style={{ minWidth: '375px' }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>

        {/* Email and Username */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm mt-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-1 top-[5px] text-gray-400" />
              <input
                type="email"
                className={`input input-bordered pl-10 w-full text-lg ${emailError ? 'border-red-500' : ''}`}
                value={email}
                onChange={handleEmailChange}
                placeholder="Ingresa tu email"
              />
            </div>
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm mt-2">Nombre de usuario</label>
            <div className="relative">
              <FaUser className="absolute left-1 top-[5px] text-gray-400" />
              <input
                type="text"
                className="input input-bordered pl-10 w-full text-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu nombre de usuario"
              />
            </div>
          </div>
        </div>

        {/* DNI and BirthDate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-1 text-sm mt-2">DNI</label>
            <div className="relative flex items-center justify-center">
              <FaIdCard className="absolute left-1 top-[5px] text-gray-400" />
              <input
                type="text"
                className="input input-bordered pl-10 w-full text-lg"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Ingresa tu DNI"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm mt-2">
              Fecha de nacimiento
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-1 z-10 top-[5px] text-gray-400" />
              <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                className="input input-bordered pl-10 w-full text-lg"
                placeholderText="Fecha de nacimiento"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
        </div>

        {/* Password and Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-1 text-sm mt-2">Contraseña</label>
            <div className="relative">
              <FaLock className="absolute left-1 top-[5px] text-gray-400" />
              <input
                type="password"
                className={`input input-bordered pl-10 w-full text-lg ${passwordError ? 'border-red-500' : ''}`}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Ingresa tu contraseña"
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm mt-2">
              Repetir contraseña
            </label>
            <div className="relative">
              <FaLock className="absolute left-1 top-[5px] text-gray-400" />
              <input
                type="password"
                className={`input input-bordered pl-10 w-full text-lg ${confirmPasswordError ? 'border-red-500' : ''}`}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Repite tu contraseña"
              />
            </div>
            {confirmPasswordError && (
              <p className="text-red-500 text-xs mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Button
            text="Registrarse"
            onClick={handleSubmit}
            disabled={!isFormComplete}
            size="md"
            type="submit"
            extraArgs={['w-full', 'rounded-lg']}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
