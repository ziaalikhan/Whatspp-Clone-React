import firebase from 'firebase';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdFksxCmxSkf98UTRySp8SHL9s7Mueshw",
    authDomain: "whatsapp-clone-b9237.firebaseapp.com",
    projectId: "whatsapp-clone-b9237",
    storageBucket: "whatsapp-clone-b9237.appspot.com",
    messagingSenderId: "574254114675",
    appId: "1:574254114675:web:dd6f69fe1313b1c9304706",
    measurementId: "G-67MS1TQFGE"
  };

  const firebaseapp = firebase.initializeApp(firebaseConfig)

  const db = firebaseapp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();


  export {auth,provider};
  export default db;
