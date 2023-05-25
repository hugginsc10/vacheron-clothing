import { useState, useEffect } from "react";
import FormInput from '../form-input/form-input'
import './login.scss'
import CustomButton from '../custom-button/custom-button'
import {auth, signInWithGoogle, logInWithEmailAndPassword } from '../../firebase/firebase.utils'
import { useAuthState } from 'react-firebase-hooks/auth';
import { selectCurrentUser } from "../../redux/user/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return ;
    }



  }, [user, loading]);


  const handleSubmit =  async event => {

    event.preventDefault();
      try {
      await logInWithEmailAndPassword(email, password)
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

          <div className='buttons'>
          <CustomButton type='submit' onClick={(e) => handleSubmit(e)}> Sign In </CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            {''}Sign in with Google{' '}
          </CustomButton>
          </div>
       </form>
     </div>
  )

}

export default Login;
// class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: '',
//       password: ''
//     }
//   }
//   handleSubmit = async event => {
//     event.preventDefault();

//     const { email, password } = this.state;

//     try {
//       await logInWithEmailAndPassword(email, password)
//       this.setState({ email: '', password: ''})
//     } catch (error) {
//       console.log(error)
//     }

//   }
//   handleChange = event => {
//     const { value, name } = event.target;

//     this.setState({ [name]: value })
//   }

//   render() {
//     return (
//       <div className="sign-in">
//         <h2>I already have an account</h2>
//         <span>Sign in with your email and password</span>
//         <form onSubmit={this.handleSubmit}>
//           <FormInput
//             name="email"
//             type="email"
//             handleChange={this.handleChange}
//             value={this.state.email}
//             label="E-Mail"
//             required />

//           <FormInput
//             name="password"
//             type="password"
//             value={this.state.password}
//             handleChange={this.handleChange}
//             label="Password"
//             required />

//           <div className='buttons'>
//           <CustomButton type='submit'> Sign In </CustomButton>
//           <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
//             {''}Sign in with Google{' '}
//           </CustomButton>
//           </div>
//        </form>
//      </div>
//     );
//   }
// }

// export default Login;