import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { GoalProvider } from './components/GoalContext'; // ✅ Import GoalProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoalProvider> {/* ✅ Wrap App with GoalProvider */}
        <App />
      </GoalProvider>
    </BrowserRouter>
  </StrictMode>
);
