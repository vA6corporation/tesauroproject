import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage().ref();
// export const firebase = firebase;