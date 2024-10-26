import AppRoutes from './routes/app.routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import { WindowSizeProvider } from './context/WindowsSizeProvider';
import Loading from './components/loading/Loading';

function App() {
  return (
    <WindowSizeProvider>
      <AppRoutes />
      <Loading />
      <ToastContainer
        position="top-right"
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
