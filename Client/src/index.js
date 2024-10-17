import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/output.css';
import App from './App';
import { AuthProvider } from './context/AllContext';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </AuthProvider>
  </>
);

