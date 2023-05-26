import React from 'react'
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './header.scss';
import { auth, logout } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cartSlice';
import { selectCurrentUser } from '../../redux/user/userSlice';


const Header = ({ currentUser }) => {
  const hidden = useSelector(selectCartHidden);
  const currUser = useSelector(selectCurrentUser);
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='/shop'>
          CONTACT
        </Link>
        {
          currUser ? (
            <div className='option' onClick={() => logout(auth)}>SIGN OUT</div>)
            : (<Link className='option' to='/login'>SIGN IN</Link>)
        }
        <CartIcon />
      </div>
      {
        hidden ? null : <CartDropdown />
      }
    </div>
  )
};

const mapStateToProps = state => createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);
