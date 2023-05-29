import {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch, Route,
  Redirect
} from 'react-router-dom';
import './App.css'

import { setCurrentUser, selectCurrentUser } from './redux/user/userSlice';
import {  useSelector, useDispatch } from 'react-redux';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import CheckoutPage from './pages/checkout/checkout';
import Header from './components/header/header';
import LoginAndRegisterPage from './pages/login-register-page/login-register-page'
import { auth } from './firebase/firebase.utils';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    console.log(process.env.REACT_APP_FIREBASE_KEY)
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(setCurrentUser(userAuth))
      } else {
        dispatch(setCurrentUser(null));
      }
    })
    return () => unsubscribe();
  }, [dispatch])

  return (
          <div>
            <Router>
              <Header/>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/shop' component={ShopPage} />
                <Route path='/checkout' component={CheckoutPage} />
                <Route exact path='/login' render={() =>
                  currentUser ? (
                    <Redirect to='/' />
                  ) : (
                      <LoginAndRegisterPage />
                    )
                  }
                  />
              </Switch>
            </Router>
          </div>
        );
}

export default App;

