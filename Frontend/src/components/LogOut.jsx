import React,{useEffect} from 'react'
import { useAuth } from '../contexts/auth'
import { Navigate } from 'react-router-dom';

const LogOut = () => {
    const {LogOutUser}=useAuth();
    useEffect(()=>{
     
        LogOutUser();
    },[LogOutUser])
  return <Navigate to="/" />
}

export default LogOut