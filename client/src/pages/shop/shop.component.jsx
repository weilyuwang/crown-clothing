import React, { useEffect, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";
import { fetchCollectionsStart } from "../../redux/shop/shop-actions";

const CollectionsOverviewContainer = lazy(() =>
  import("../../components/collections-overview/collections-overview.container")
);
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container")
);

const ShopPage = ({ dispatchFetchCollectionsStart, match }) => {
  useEffect(() => {
    dispatchFetchCollectionsStart();
  }, [dispatchFetchCollectionsStart]);
  // [dispatchFetchCollectionsStart] paramter means that we only want to fire up dispatchFetchCollectionsStart once.

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          //the path param will be passed to CollectionPage as prop (ownProps.match.params.collectionId)
          component={CollectionPageContainer}
        />
      </Suspense>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatchFetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
