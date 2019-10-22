import React from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart-selectors";
import { toggleCartHidden } from "../../redux/cart/cart-actions";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import "./cart-dropdown.styles.scss";

//connect function automatically passes a dispatch prop into our component (if no mapDispatchToProps is provided to connect()), so we can use the dispatch function directly
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

/*
const mapStateToProps = state => ({
  cartItems: state.cart.cartItems
});
*/

//use selector:
/*
const mapStateToProps = state => ({
  cartItems: selectCartItems(state)
});
*/

//use createStructuredSelector to automatically pass state to individual selectors:
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

//withRouter:
//This gives the CartDropdown component access to this.props.history, which means the CartDropdown can now redirect the user.
export default withRouter(connect(mapStateToProps)(CartDropdown));
