import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Admin from './Admin.tsx';
import './index.css'; 

const path = window.location.pathname;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* path === ৰ সলনি path.includes ব্যৱহাৰ কৰা হৈছে যাতে /admin/ থাকিলেও কাম কৰে */}
    {path.includes('/admin') ? <Admin /> : <App />}
  </StrictMode>,
);
