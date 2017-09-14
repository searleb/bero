import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDiYFDrQt5HOEakaVF5fb_Q8nuRz1K_JCI',
  authDomain: 'bero-me.firebaseapp.com',
  databaseURL: 'https://bero-me.firebaseio.com',
  projectId: 'bero-me',
  storageBucket: '',
  messagingSenderId: '489595024807',
};

firebase.initializeApp(config)

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export default firebase
