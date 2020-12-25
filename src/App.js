import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route,
  Redirect
} from 'react-router-dom';
import './App.css'
import { setCurrentUser } from './redux/user/user.actions';
import { connect } from 'react-redux';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import CheckoutPage from './pages/checkout/checkout';
import Header from './components/header/header';
import LoginAndRegisterPage from './pages/login-register-page/login-register-page'
import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {

    const { setCurrentUser, collectionsArray } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          })
        };
      setCurrentUser(userAuth);
      addCollectionAndDocuments('collections',
        collectionsArray.map(({ title, items }) => ({ title, items }))
      );
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Router>
          <Header/>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route path='/checkout' component={CheckoutPage} />
            <Route exact path='/login' render={() =>
              this.props.currentUser ? (
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
};

const mapStateToProps = state => createStructuredSelector ({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps, mapDispatchToProps)(App);
