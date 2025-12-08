import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from './Routes/Router.jsx'
import { RouterProvider } from "react-router/dom";
import AuthProvider from './Context/AuthContext/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster />
    <AuthProvider> <RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
