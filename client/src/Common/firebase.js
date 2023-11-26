// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa-wRWbgwpDm-iQKgk5ROE8BSsIP59bK4",
  authDomain: "electronics-ecommerce-45992.firebaseapp.com",
  projectId: "electronics-ecommerce-45992",
  storageBucket: "electronics-ecommerce-45992.appspot.com",
  messagingSenderId: "1023632020310",
  appId: "1:1023632020310:web:a9addbd0a47703d52d7cf7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export 

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.googleAuthProvider();