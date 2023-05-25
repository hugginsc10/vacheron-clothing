import React from 'react'
import { connect, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCartItems, selectCartTotal } from '../../redux/cart/cartSlice';
import './checkout.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button';

const CheckoutPage = ({cartItems, total}) => {

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className='header-block'>
          <span>Products</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {
        cartItems.map(cartItem =>
          <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
      }
      <div className='total'>
        <div className='test-warning'>
          *Please use the following test credit card for payments*
           <br />
          4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
         </div>
        <StripeCheckoutButton price={total} />

      </div>
    </div>
  )
}

const mapStateToProps = (state) => createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
})



export default connect(mapStateToProps)(CheckoutPage)
