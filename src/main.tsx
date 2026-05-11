import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRoutes } from '../Routes.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { UserProvider } from './contexts/UserContext'

const GOOGLE_CLIENT_ID = "928842185358-19s44p4d6re67tak7u268v4apsm2nks6.apps.googleusercontent.com"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)