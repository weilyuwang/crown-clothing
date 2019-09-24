import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

//want <Header> component to be present on every page, so put it out of the <Switch><Route>
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    //open subscription: auth.onAuthStateChanged gets triggered every time a user signs in or out.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //check if there's a user signed in
      if (userAuth) {
        //get our user reference first
        const userRef = await createUserProfileDocument(userAuth);
        //onSnapshot returns a user snapshot object, then we can set our state (user state) equal to the returned snapshot user object
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          console.log(this.state);
        });
      }
      //if userAuth == null, set our state to null as well:
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    //unsubscribe
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
