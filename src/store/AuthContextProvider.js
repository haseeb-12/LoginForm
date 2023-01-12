import { useState, createContext, useEffect, useCallback } from "react"

let logouTimer
// u]outside of rendering component ---no rendering

const AuthContext = createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
})
// these function executed if e call function login and logout


const calculateTime = (expirationTime) => {
    const currentTime = new Date().getTime()
    const adExpirationTime = new Date(expirationTime).getTime()

    const remainingTime = adExpirationTime - currentTime
    return remainingTime
}

const retriveStoredToken = () => {
    const storedToken = localStorage.getItem('token')
    const storedExpireTime = localStorage.getItem('expirationTime')

    const remainingTime = calculateTime(storedExpireTime)

    if (remainingTime <= 60000) {
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')
        return null
    }
    return {
        token: storedToken,
        duration: remainingTime
    }
}

export const AuthContextProvider = (prop) => {

    const tokenData = retriveStoredToken()
    console.log(tokenData)
    
    let initialToken 
    
    if(tokenData){
        initialToken= tokenData.token
    }
    
    console.log(initialToken)
    const [token, setToken] = useState(initialToken)

    
    const logoutHandler = useCallback(() => {
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')

        if(logouTimer)
        clearTimeout(logouTimer)
            
    })


    const loginHandler = (token, expirationTime) => {
        setToken(token)
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime)

        const remainingDuration = calculateTime(expirationTime)
        logouTimer = setTimeout(logoutHandler, remainingDuration)
    }

    const userIsLoggedIn = !!token

    useEffect(()=>{
        if(tokenData){
            logouTimer=setTimeout(logoutHandler,tokenData.duration)
        }
    },[tokenData,logoutHandler])

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={contextValue}
        >{prop.children}
        </AuthContext.Provider>
    )
}

export { AuthContext }























































