import { useState } from "react";
import FormInput from '../form-input/form-input'
import './login.scss'
import CustomButton from '../custom-button/custom-button'
import { signInWithGoogle, logInWithEmailAndPassword } from '../../firebase/firebase.utils'
;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
        await logInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error)
    }

  }
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.log(error)
    }
}
  return (
    <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form>
          <FormInput
            name="email"
            type="email"
            handleChange={(e) => setEmail(e.target.value)}
            value={email}
            label="E-Mail"
            required />

          <FormInput
            name="password"
            type="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            label="Password"
            required />

       </form>
          <div className='buttons'>
          <CustomButton type='submit' onClick={(e) => handleSignIn(e)}> Sign In </CustomButton>
          <CustomButton onClick={() => handleGoogleSignIn()} isGoogleSignIn>
            {''}Sign in with Google{' '}
          </CustomButton>
          </div>
     </div>
  )

}

export default Login;
