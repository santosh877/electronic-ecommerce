/* eslint-disable import/no-anonymous-default-export */
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = process.env.REACT_APP_FIREBASE_CONFIG;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export 

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export  {auth , googleProvider , firebaseConfig};
