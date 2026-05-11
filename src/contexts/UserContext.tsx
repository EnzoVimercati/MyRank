import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type User = {
    name: string
    email: string
    picture: string
}

type UserContextType = {
    user: User | null
    setUser: (user: User | null) => void
    logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser))
            } catch {
                localStorage.removeItem('user')
            }
        }
    }, [])

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser deve ser usado dentro de um UserProvider')
    }
    return context
}
