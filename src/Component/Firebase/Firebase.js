import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBt2z_6g0dzwB9lj2eYY9Z2yXp-_VNuApI",
  authDomain: "campus-management-web.firebaseapp.com",
  projectId: "campus-management-web",
  storageBucket: "campus-management-web.appspot.com",
  messagingSenderId: "987739047798",
  appId: "1:987739047798:web:0dcfcb88e283000e355c57",
  measurementId: "G-M7J7GKD5WG",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
