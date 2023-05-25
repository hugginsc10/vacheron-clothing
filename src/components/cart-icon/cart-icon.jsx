import React from 'react';
import { connect, useSelector } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../../assets/cart.svg';
import {selectCartItemsCount, toggleCartHidden} from '../../redux/cart/cartSlice';
import { createStructuredSelector } from 'reselect';
import './cart-icon.scss'

const CartIcon = ({ toggleCartHidden, itemCount }) => {
  const itemQuantity = useSelector(selectCartItemsCount)
  return (
    <div className='cart-icon' onClick={toggleCartHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemQuantity}</span>
    </div>
  )
}


const mapStateToProps = state => createStructuredSelector({
  itemCount: selectCartItemsCount
})

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);