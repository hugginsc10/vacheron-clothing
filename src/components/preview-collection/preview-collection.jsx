import React from 'react'
import './preview-collection.scss'
import CollectionItem from '../collection-item/collection-item';
import { useSelector } from 'react-redux';
import { selectCollection } from '../../redux/shop/shopSlice';

const PreviewCollection = ({title, items}) => {
  const collection = useSelector(selectCollection());
  console.log(collection)
  // const {title, items} = collection;
  console.log(title, items);
  return (
    <div className='collection-preview'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <div className='preview'>
          {items
              .filter((item, idx) => idx < 4)
              .map( item => (
                <CollectionItem key={item.id} item={item} />
            ))
          }
      </div>
    </div>
  )
}
export default PreviewCollection;