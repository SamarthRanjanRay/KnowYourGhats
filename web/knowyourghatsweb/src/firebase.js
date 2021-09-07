import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'
import 'firebase/firebase-storage'
// import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDmCRSkcDZKIBfwpR2bNK71T9Dewuuk0-g",
    authDomain: "ghats-59362.firebaseapp.com",
    databaseURL: "https://ghats-59362.firebaseio.com",
    projectId: "ghats-59362",
    storageBucket: "ghats-59362.appspot.com",
    messagingSenderId: "811030453538",
    appId: "1:811030453538:web:3e6c70f257883d0c47197b",
    measurementId: "G-1YNE3YSVEQ"
  };
  firebase.initializeApp(firebaseConfig); 


export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`webusers/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = user;
    try {
      await userRef.set({
        email,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`webusers/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

//export const generateUserDocument = generateUserDocument();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
// export const storage = getStorage(firebase);