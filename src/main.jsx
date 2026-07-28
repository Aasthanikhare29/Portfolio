import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import './admin/styles/admin.css'
import { AdminAuthProvider } from './admin/context/AdminAuthContext'
import { ToastProvider } from './admin/context/ToastContext'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
