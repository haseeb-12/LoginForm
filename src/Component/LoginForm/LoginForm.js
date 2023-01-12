import React from 'react'
import './Form.css'
import { useState, useRef } from 'react';
import { useContext } from 'react';
import {AuthContext} from '../../store/AuthContextProvider';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const navigate=useNavigate()
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setLoading] = useState(false)

const authCtx= useContext(AuthContext)

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState)
    }

    const submitHandler = (e) => {
        e.preventDefault()

        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value

        // validation
        setLoading(true)
        let url
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCldCsc6hGfSR2CSSOSYP_p_XyJQ00txSE'
        }
        else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCldCsc6hGfSR2CSSOSYP_p_XyJQ00txSE'
            // fetch return promise 
        }
  fetch(url, {
            method: 'POST',
            // default request is get
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
            }),
            // should be in json format for data exchange
            headers: {
                'Content-Type': 'application/json'
            }
        })
      .then(res => {
            setLoading(false)
            if (res.ok) {
                // ,...
                return res.json()
            }
            else {
                res.json().then(data => {
                    // res.json() also return promise
                    // show modal for error
                    console.log(data)
                    alert(data.error.message)
                })
            }
        }).then(data=>{
            const expirationTime=new Date(new Date().getTime()+(+data.expiresIn*1000))
            authCtx.login(data.idToken,expirationTime)
            navigate('/')
        })
    }
    return (
        <section className='auth'>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className='control'>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                </div>
                <div className='control'>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={passwordInputRef} />
                </div>
                <div className='actions'>
                    {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading && <p>Sending request.....</p>}
                    <button
                        type='button'
                        className='toggle'
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );

}

export default LoginForm