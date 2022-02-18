import { createContext, ReactNode, useContext } from "react";



interface AuthProviderProps {
    children: ReactNode
}

interface User {
   id: string
   name: string 
   email: string
}

interface AuthContextData {
    user: User
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({children}:  AuthProviderProps){
    const user = {
        name: 'micaio valente',
        id: 'aaa',
        email: 'micaiovalente@gmail.com'

    }
    return(
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }