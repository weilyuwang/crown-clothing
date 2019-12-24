import React from "react";
import { connect } from "react-redux";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart-selectors";
import { toggleCartHidden } from "../../redux/cart/cart-actions";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  CartDropdownContainer,
  CartDropdownButton,
  EmptyMessageContainer,
  CartItemsContainer
} from "./cart-dropdown.styles";

// connect function automatically passes a dispatch prop into our component (if no mapDispatchToProps is provided to connect()), so we can use the dispatch function directly
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
      )}
    </CartItemsContainer>
    <CartDropdownButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer>
);

/*
// original mapStateToProps

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems
});


// use selector:

const mapStateToProps = state => ({
  cartItems: selectCartItems(state)
});
*/

// use createStructuredSelector to automatically pass state to individual selectors:
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

// withRouter:
// This gives the CartDropdown component access to this.props.history, which means the CartDropdown can now redirect the user.
export default withRouter(connect(mapStateToProps)(CartDropdown));
