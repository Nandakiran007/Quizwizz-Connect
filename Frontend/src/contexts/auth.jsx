import { jwtDecode } from "jwt-decode";
import { createContext ,useContext,useState} from "react";
import Cookies from "universal-cookie";
import axios from "axios"


export const AuthContext = createContext()

export const AuthProvider=({children})=>{
    const cookies=new Cookies();
    const [token,setToken]=useState(cookies.get("token"))
    let isLoggedin=!!token;
    
    

    const LogOutUser=()=>{

        setToken("");
        return cookies.remove("token");
         
    } 
    const storeUserData=(token)=>{
        setToken(token);
        cookies.set("token", token);
        
    }
    const getUserData=()=>{
        // console.log("111",token)
        if(token)
        {   
            const decoded = jwtDecode(token);
            return decoded;
        }
        console.log("no user token was available at this moment")
        return "no user"

    }
    const [user,setUser]=useState((isLoggedin?getUserData():null));
    
    const [userDetails,setUserDetails]=useState(null);

    
    


    return (
        <AuthContext.Provider
            value={{
                isLoggedin,
                storeUserData,
                LogOutUser,
                getUserData,
                user,
                userDetails,
                setUserDetails,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}



export const  useAuth= () => {
    const authContextValue= useContext(AuthContext)
    if(!authContextValue){
        throw new Error("useAuth is used outside of useAuth provider")
    }
    return authContextValue;
}