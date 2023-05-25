import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/cart/cartSlice';
import './collection-item.scss';
import CustomButton from '../custom-button/custom-button';



const CollectionItem = ({ item }) => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const { name, price, imageUrl, quantity } = item;
  return (
    <div className="collection-item">
      <div className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />

      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>${price}</span>
      </div>
      <CustomButton onClick={() => dispatch(addItem(item))} inverted>
        Add to Cart
        </CustomButton>
    </div>
  )
}

export default CollectionItem;
