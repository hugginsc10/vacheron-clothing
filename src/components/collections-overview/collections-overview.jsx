import React from 'react';
import CollectionPreview from '../preview-collection/preview-collection';
import {  selectCollections } from '../../redux/shop/shopSlice';
import { useSelector } from 'react-redux';
import './collections-overview.scss';

const CollectionsOverview = () => {
  const selectedCollections = useSelector(selectCollections)

  const collections = Object.keys(selectedCollections).map((key) => {
    return selectedCollections[key]
    })
  return (
  <div className='collections-overview'>
    {collections.map(({ id, ...otherCollectionProps }) => (
    <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
  )
}
export default CollectionsOverview;
