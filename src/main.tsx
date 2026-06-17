import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Admin from './Admin.tsx';
import './index.css'; // এইটো ডিজাইনৰ বাবে বহুত দৰকাৰী

const path = window.location.pathname;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {path === '/admin' ? <Admin /> : <App />}
  </StrictMode>,
);
