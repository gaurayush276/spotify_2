import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react";
import {Loader} from 'lucide-react'

// whenever you refresh the page it will chack the auth
 const updateApiToken = (token :String | null )=>{
        if ( token ) {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
        else {
            delete axiosInstance.defaults.headers.common["Authorization"]
        }
 }

const AuthProvider = ({children} : {children : React.ReactNode}) => {
    //  React.ReactNode means:
// It can be any valid React content:
// Text, elements, components, fragments, arrays, etc.


    const {getToken} = useAuth() ; 
    const [loading , setLoading] = useState(true) ;

    useEffect(()=>{
        const intitAuth = async ()=>{
            try{
                const token = await getToken() ; 
                updateApiToken(token) ; 
            }
            catch(error : any){
                updateApiToken(null) ; 
            console.log("error in auth Provider" + error) ;
    }
    finally {
        setLoading(false) ; 
    }
        } ; 

        intitAuth() ; 
    } , [getToken])



    if( loading) 
        return (
            <div className="h-screen flex justify-center items-center">
              <Loader className="w-9 h-9 animate-spin" />
            </div>
          );

  return (
    <div>{children}</div>
  )
}

export default AuthProvider