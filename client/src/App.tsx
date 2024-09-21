import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/app.routes';
import { WindowSizeProvider } from './context/WindowsSizeProvider';

function App() {
  return (
    <WindowSizeProvider>
      <AppRoutes />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </WindowSizeProvider>
  );
}

export default App;
