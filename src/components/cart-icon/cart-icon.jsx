import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cartSlice';
import { ReactComponent as ShoppingIcon } from '../../assets/cart.svg';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import './cart-icon.scss'

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
)


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