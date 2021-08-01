import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAMVxrCPVOmnIxkRzMeNig29gQTU3MaJeM",
    authDomain: "ware-shop.firebaseapp.com",
    projectId: "ware-shop",
    storageBucket: "ware-shop.appspot.com",
    messagingSenderId: "973988220283",
    appId: "1:973988220283:web:56471ce08221f40ae041de",
    measurementId: "G-4Z5YB1950W"
});

const db = firebaseApp.firestore();

export { db };