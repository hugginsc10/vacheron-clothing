import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import WithSpinner from '../with-spinner/with-spinner';
import CollectionsOverview from './collections-overview';
import { selectIsFetching } from '../../redux/shop/shopSlice';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetching
})

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
