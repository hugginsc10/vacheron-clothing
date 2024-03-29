import React from 'react'
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './header.scss';
import { logout } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cartSlice';
import { selectCurrentUser } from '../../redux/user/userSlice';


const Header = ({ currentUser }) => {
  const hidden = useSelector(selectCartHidden);
  const currUser = useSelector(selectCurrentUser);
  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='shop' to='/shop'>
          SHOP
        </Link>
        <Link className='contact' to='/shop'>
          CONTACT
        </Link>
        {
          currUser ? (
            <Link className='sign-out' to='/' onClick={() => logout()}>SIGN OUT</Link>)
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
