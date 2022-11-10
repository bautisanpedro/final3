import app from 'firebase/app'
import firebase from 'firebase'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYgB1oMOw3pVYDE7atcwR_6QK6BgnNBJo",
  authDomain: "prog-final-2ba6d.firebaseapp.com",
  projectId: "prog-final-2ba6d",
  storageBucket: "prog-final-2ba6d.appspot.com",
  messagingSenderId: "210718752103",
  appId: "1:210718752103:web:18920d093d5d62408043c2"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
