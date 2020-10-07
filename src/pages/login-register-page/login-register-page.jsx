import React from 'react'
import './login-register-page.scss'
import Login from '../../components/login/login'
import SignUp from '../../components/sign-up/signup';

const LoginAndRegisterPage = () => {
  return (
    <div className="sign-in-and-sign-up">
      <Login />
      <SignUp />
    </div>
    
      
  )
}

export default LoginAndRegisterPage
