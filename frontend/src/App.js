import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from "./pages/HomePage"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import CarDetails from './components/CarDetails';

function App() {
  return (
    <div className="App bg-slate-100 h-[100vh]">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/:keyword?' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='details/:id' element={<CarDetails />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
      />

    </div>
  );
}

export default App;
