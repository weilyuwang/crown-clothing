import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

// HOC : High Order Component
// HOC takes some wrapped component as a parameter, then returns back a functional component
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
