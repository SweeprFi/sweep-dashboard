import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@pages/App';
import reportWebVitals from './reportWebVitals';
import { UseWalletProvider } from '@utils/walletHelper'
import '@styles/global.css';
import { Buffer } from 'buffer'
window.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UseWalletProvider>
      <App />
    </UseWalletProvider>
  </React.StrictMode>
);

reportWebVitals();
