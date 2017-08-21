import firebase from "firebase";
var config = {
  apiKey: "AIzaSyDHLfOmlOWfL5h3T0WOh9YLSo3lebV7RmY",
  authDomain: "vestobrasil.com",
  databaseURL: "https://form-register.firebaseio.com",
  projectId: "form-register",
  storageBucket: "form-register.appspot.com",
  messagingSenderId: "272911353985"
};
var fire = firebase.initializeApp(config);
export default fire;
