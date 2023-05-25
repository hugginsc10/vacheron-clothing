import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import CustomButton from '../custom-button/custom-button';
import './cart-dropdown.scss';
import CartItem from '../cart-item/cart-item';
import { selectCartItems, toggleCartHidden } from '../../redux/cart/cartSlice';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className="cart-dropdown">
    <div className="cart-items" />
    {
      cartItems.length ?
        cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem} />)) :
        <span className='empty-message'>Your cart is empty</span>
    }
    <CustomButton onClick={() => {
      history.push('/checkout');
      dispatch(toggleCartHidden())
    }
    }>GO TO CHECKOUT</CustomButton>
  </div>
)
;

const mapStateToProps = (state) => createStructuredSelector({
  cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));