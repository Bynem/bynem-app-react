import Context from "@mui/base/TabsUnstyled/TabsContext";
import { createContext, ReactNode, useContext, useState } from "react";
interface AuthProviderProps {
    children: ReactNode
}

interface User {
   id: string
   name: string 
   email: string
   token: string
}

interface AuthContextData {
    user: User
    setUser: Function
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({children}:  AuthProviderProps){
    const [user, setUser] = useState<User>({} as User)

    const ContextValue = {
        user,
        setUser
    }

    
    return(
        <AuthContext.Provider value={ContextValue}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }