import { FaUser } from 'react-icons/fa';
import Button from '../../components/button/Button';
import './login.scss';
import { useState } from 'react';
import { isEmailValid, isPasswordValid } from '../../utils/Validators';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>('');
  const [passwordError, setPasswordError] = useState<string | undefined>('');

  const isFormValid = email && password && !emailError && !passwordError;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const { errorMessage, hasError } = isEmailValid(value);
    setEmailError(hasError ? errorMessage : '');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const validation = isPasswordValid(value);
    setPasswordError(validation.hasError ? validation.errorMessage : '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Email:', email);
      console.log('Password:', password);
      toast.success('Sesión iniciada', { autoClose: 2000 });
    }
  };

  return (
    <div
      className="w-[100%] flex flex-col justify-center items-center"
      id="login"
    >
      <div className="login-card-container">
        <div className="card-content">
          <h1 className="text-3xl text-white uppercase font-bold">Ingresar</h1>
          <form
            className="bg-white p-6 rounded shadow-md w-full"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl mb-4">Iniciar Sesión</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className={`border rounded w-full py-2 px-3 ${
                  emailError ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ingrese su email"
              />
              {emailError && (
                <p className="text-red-500 text-xs">{emailError}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className={`border rounded w-full py-2 px-3 ${
                  passwordError ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ingrese su contraseña"
              />
              {passwordError && (
                <p className="text-red-500 text-xs">{passwordError}</p>
              )}
            </div>
            <Button
              text="Iniciar Sesión"
              type="submit"
              disabled={!isFormValid}
              fontSize="text-lg"
              size="xl"
              icon={<FaUser />}
              iconPosition="left"
              extraArgs={['rounded', 'flex', 'items-center', 'justify-center']}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
