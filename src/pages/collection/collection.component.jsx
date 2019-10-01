import React from "react";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop-selectors";

import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;

  /*
  unsubscribeFromCollections = null;

  componentDidMount() {
    this.unsubscribeFromCollections = firestore.collection('collections').onSnapshot()
  }

  componentWillUnmount() {
    this.unsubscribeFromCollections()
  }
  */

  //return a clean-up function, the function is called when the component unmounts.
  // like componentWillUnmount

  /*
  useEffect(() => {
    console.log("I am subscribing");
    const unsubscribeFromCollections = firestore
      .collection("collections")
      .onSnapshot(snapshot => console.log(snapshot));
    return () => {
      console.log("I am unsubscribing");
      unsubscribeFromCollections();
    };
  }, []);
  */

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
