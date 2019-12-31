import React from "react";
import Spinner from "../spinner/spinner.component";

// HOC : High Order Component
// HOC takes some wrapped component as a parameter, then returns back a functional component
// HOC passes through the props down to the component we wrap by passing ...otherProps
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
