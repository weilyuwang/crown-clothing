import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";

import CollectionPageContainer from "../collection/collection.container";

import { fetchCollectionsStart } from "../../redux/shop/shop-actions";

const ShopPage = ({ dispatchFetchCollectionsStart, match }) => {
  useEffect(() => {
    dispatchFetchCollectionsStart();
  }, [dispatchFetchCollectionsStart]);
  // [dispatchFetchCollectionsStart] paramter means that we only want to fire up dispatchFetchCollectionsStart once.

  return (
    <div className="shop-page">
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
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatchFetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
