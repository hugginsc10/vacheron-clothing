import { useState } from "react";
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { auth,  registerWithEmailAndPassword } from '../../firebase/firebase.utils';
import './signup.scss'


const SignUp = () => {

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
         <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form'>
              <FormInput
                type='text'
                name='displayName'
                value={displayName}
                handleChange={(e) => setDisplayName(e.target.value)}
                label='Display Name'
                required />
              <FormInput
                type='email'
                name='email'
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
                label='Email'
                required />
              <FormInput
                type='password'
                name='password'
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
                label='Password'
                required />
              <FormInput
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                handleChange={(e) => setConfirmPassword(e.target.value)}
                label='Confirm Password'
                required />
              <CustomButton type='submit' onClick={() => registerWithEmailAndPassword(auth, email, password)}>SIGN UP</CustomButton>
            </form>
         </div>
        );
}
export default SignUp;
