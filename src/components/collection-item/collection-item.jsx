import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/cart/cartSlice';
import './collection-item.scss';
import CustomButton from '../custom-button/custom-button';



const CollectionItem = ({ item}) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { name, price, imageUrl } = item;
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
