/* eslint-disable import/no-anonymous-default-export */
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import { initializeApp } from "firebase/app";
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

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export  {auth , googleProvider , firebaseConfig};
