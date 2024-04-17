// Encapsulate higher-order components
// Core logic: route normally if there is a token, login if there is no token
import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"

export function AuthRoute({ children }) {
    const token = getToken()
    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to={'/login'} replace />
    }
}