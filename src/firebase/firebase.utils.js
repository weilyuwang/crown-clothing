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

// Initialize Firebase
firebase.initializeApp(config);

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  //console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  //console.log(transformedCollection);
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
