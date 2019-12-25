import { connect } from "react-redux";
// import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionLoaded } from "../../redux/shop/shop-selectors";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "../collection/collection.component";

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionLoaded(state)
});

const CollectionPageContainer = connect(mapStateToProps)(
  WithSpinner(CollectionPage)
);

// Alternatively: using compose() from redux:

// const CollectionPageContainer = compose(
//   connect(mapStateToProps),
//   WithSpinner
// )(CollectionPage);

export default CollectionPageContainer;
