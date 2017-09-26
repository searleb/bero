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
export const database = firebase.database()


export default firebase


export function writeUserData(user) {
  database.ref(`users/${user.uid}`).update({
    username: user.displayName,
    uid: user.uid,
  });
}

export function writeToSavedLocations(user, location) {
  database.ref(`users/${user.uid}/favourites`).update({
    [location.id]: { ...location },
  });
}

export function readSavedLocations(user, callback) {
  database.ref(`users/${user.uid}/favourites`).on('value', snapshot => callback(snapshot.val()))
}
