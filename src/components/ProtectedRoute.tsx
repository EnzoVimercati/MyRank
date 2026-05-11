import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useUser } from '../contexts/UserContext'

interface ProtectedRouteProps {
    children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user } = useUser()

    if (!user) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}
