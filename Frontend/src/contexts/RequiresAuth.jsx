import { useAuth } from "./auth"
import { Navigate } from "react-router-dom"

export const RequiresAuth=({children})=>{
    const {isLoggedin}=useAuth()
    return isLoggedin ? children : <Navigate to="/login"/>
}