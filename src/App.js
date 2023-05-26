import {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch, Route,
  Redirect
} from 'react-router-dom';
import './App.css'

import { setCurrentUser, selectCurrentUser, login, logout } from './redux/user/userSlice';
import {  useSelector, useDispatch } from 'react-redux';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import CheckoutPage from './pages/checkout/checkout';
import Header from './components/header/header';
import LoginAndRegisterPage from './pages/login-register-page/login-register-page'
import { auth, createUserProfileDocument, addCollectionAndDocuments, db} from './firebase/firebase.utils';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDoc, query, where } from 'firebase/firestore';
import { signInWithGoogle, signOut} from './redux/authMiddleware';
const App = () => {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
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


// class App extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       currentUser: null
//     }
//   }

//   unsubscribeFromAuth = null

//   componentDidMount() {

//     const { setCurrentUser, collectionsArray } = this.props;
//     const { user, loading, error } = useAuthState(auth);

//     this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
//       console.log(auth)
//       if (userAuth) {
//         const userRef = await createUserProfileDocument(userAuth);

//         userRef.onSnapshot(snapShot => {
//             setCurrentUser({
//               id: snapShot.id,
//               ...snapShot.data()
//             })
//           })
//         };
//       setCurrentUser(userAuth);
//       console.log(this.props)
//       addCollectionAndDocuments('collections',
//         collectionsArray.map(({ title, items }) => ({ title, items }))
//       );
//     })
//   }

//   componentWillUnmount() {
//     this.unsubscribeFromAuth();
//   }

//   render() {
//     return (
//       <div>
//         <Router>
//           <Header/>
//           <Switch>
//             <Route exact path='/' component={HomePage} />
//             <Route path='/shop' component={ShopPage} />
//             <Route path='/checkout' component={CheckoutPage} />
//             <Route exact path='/login' render={() =>
//               this.props.currentUser ? (
//                 <Redirect to='/' />
//               ) : (
//                   <LoginAndRegisterPage />
//                 )
//               }
//               />
//           </Switch>
//         </Router>
//       </div>
//     );
//   }
// };

// const mapStateToProps = state => createStructuredSelector ({
//   currentUser: selectCurrentUser,
//   collectionsArray: selectCollectionsForPreview
// })

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// })

// export default connect(
//   mapStateToProps, mapDispatchToProps)(App);
