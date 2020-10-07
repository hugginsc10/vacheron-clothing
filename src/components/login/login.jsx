import React, { Component } from "react"; 
import FormInput from '../form-input/form-input'
import './login.scss'
import CustomButton from '../custom-button/custom-button'
import {auth, signInWithGoogle} from '../../firebase/firebase.utils'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }
  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password)
      this.setState({ email: '', password: ''})
    } catch (error) {
      console.log(error)
    }

  }
  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="E-Mail"
            required />
    
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="Password"
            required />
       
          <div className='buttons'>
          <CustomButton type='submit'> Sign In </CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            {''}Sign in with Google{' '}
          </CustomButton>
          </div>
       </form>
     </div>
    );
  }
}

export default Login;