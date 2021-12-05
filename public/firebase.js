import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
apiKey: "AIzaSyAtrWElhYWIscOAK9Ww8LIc2HmW79ncFV0",
  authDomain: "lionssupport-471fa.firebaseapp.com",
  projectId: "lionssupport-471fa",
  storageBucket: "lionssupport-471fa.appspot.com",
  messagingSenderId: "988757581275",
  appId: "1:988757581275:web:f5bb98f4d2ee74e3c41bfe"
};



export const firebaseApp=firebase.initializeApp(firebaseConfig)