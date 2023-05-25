import { useEffect, useState, Component } from "react";
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { auth, createUserProfileDocument, registerWithEmailAndPassword } from '../../firebase/firebase.utils';
import './signup.scss'
import { useAuthState } from 'react-firebase-hooks/auth';

const SignUp = () => {

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [user, loading, error] = useAuthState(auth);
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
// class SignUp extends Component {
//   constructor() {
//     super();

//     this.state = {
//       displayName: '',
//       email: '',
//       password: '',
//       confirmPassword: ''
//     }
//   }

//   handleSubmit = async event => {
//     event.preventDefault();

//     const { displayName, email, password, confirmPassword } = this.state;
//     if (password !== confirmPassword) {
//       alert("Password doesn't Match");
//       return;
//     }
//     try {
//       const { user } = await registerWithEmailAndPassword(auth,
//         email,
//         password
//       );

//       await createUserProfileDocument(user, { displayName });
//       this.setState({
//         displayName: "",
//         email: "",
//         password: "",
//         confirmPassword: ""
//       });

//     } catch (error) {
//       console.error(error)
//     }
//   };

//   handleChange = event => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value })

//   }

//   render() {
//     const {displayName, email, password, confirmPassword } = this.state
//     return (
//      <div className='sign-up'>
//         <h2 className='title'>I do not have an account</h2>
//         <span>Sign up with your email and password</span>
//         <form className='sign-up-form' onSubmit={this.handleSubmit}>
//           <FormInput
//             type='text'
//             name='displayName'
//             value={displayName}
//             onChange={this.handleChange}
//             label='Display Name'
//             required />
//           <FormInput
//             type='email'
//             name='email'
//             value={email}
//             onChange={this.handleChange}
//             label='Email'
//             required />
//           <FormInput
//             type='password'
//             name='password'
//             value={password}
//             onChange={this.handleChange}
//             label='Password'
//             required />
//           <FormInput
//             type='password'
//             name='confirmPassword'
//             value={confirmPassword}
//             onChange={this.handleChange}
//             label='Confirm Password'
//             required />
//           <CustomButton type='submit'>SIGN UP</CustomButton>
//         </form>
//      </div>
//     );
//   }
// }

// export default SignUp;