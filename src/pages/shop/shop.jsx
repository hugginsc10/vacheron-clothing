import { Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionsStartAsync } from '../../redux/shop/shopSlice';
import './shop.scss';

const ShopPage = ({  match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(fetchCollectionsStartAsync());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch])

  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`}
      component={CollectionsOverviewContainer}
      />
      <Route path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
        />
    </div>
  )
}

export default ShopPage;
