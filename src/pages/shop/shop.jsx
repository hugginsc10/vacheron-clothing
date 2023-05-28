import { Route } from 'react-router-dom';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionsStartAsync } from '../../redux/shop/shopSlice';

const ShopPage = ({  match }) => {

  fetchCollectionsStartAsync();

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
