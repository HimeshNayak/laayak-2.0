import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAmIvOPjQnup4mQ5aG39T5baEpulNmWv4k",
  authDomain: "laayak-web-app.firebaseapp.com",
  databaseURL: "https://laayak-web-app.firebaseio.com",
  projectId: "laayak-web-app",
  storageBucket: "laayak-web-app.appspot.com",
  messagingSenderId: "308936714271",
  appId: "1:308936714271:web:002f9b74b345181da7cd2a",
  measurementId: "G-YHF3LDWKKG"
};

firebase.initializeApp(firebaseConfig);
export default firebase;