import firebase from "firebase/app";

import "firebase/firestore"; //for database
import "firebase/auth"; //for authentication

//app's Firebase configuration
const config = {
  apiKey: "AIzaSyDaBrNfc0sjM6Ht2RhaKER8NQdC_3WFVyQ",
  authDomain: "crown-clothing-db-c5fff.firebaseapp.com",
  databaseURL: "https://crown-clothing-db-c5fff.firebaseio.com",
  projectId: "crown-clothing-db-c5fff",
  storageBucket: "",
  messagingSenderId: "443117383558",
  appId: "1:443117383558:web:53516db798c47e61dc4607",
  measurementId: "G-VWSVQ8X99Y"
};

export const createUserProfileDocument = async (userAuth, otherData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`user/${userAuth.uid}`);
  const snapShot = await userRef.get(); //get() is async
  if (!snapShot.exists) {
    //if user doc not existed yet in our database
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      //create user doc and store it into our database
      await userRef.set({
        displayName,
        email,
        createAt,
        ...otherData
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }
  return userRef;
};

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
