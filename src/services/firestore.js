import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDHW9dNluVmRMn9fvtiz4l34ZBbDWsOuBg",
    authDomain: "testapp-6ab58.firebaseapp.com",
    databaseURL: "https://testapp-6ab58.firebaseio.com",
    projectId: "testapp-6ab58",
    storageBucket: "testapp-6ab58.appspot.com",
    messagingSenderId: "498353385934"
  };
  
firebase.initializeApp(config);
const db = firebase.firestore();

export async function getDocument(collection, key) {
    try {
      const collectionRef = db.collection(collection);
      return collectionRef.doc(key).get();
    } catch (error) {
      console.log({ error });
    }
}

export async function getDocuments(collection, filters) {
    
    try {
      let collectionRef = db.collection(collection);
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          const { value, op = '==' } = filters[key];
          if (value && value !== 'any') {
            collectionRef = collectionRef.where(key, op, value);
          }
        }
      }
  
      const querySnapshot = await collectionRef.get();
      const videos = {};
      querySnapshot.forEach((current) => {
        videos[current.id] = current.data();
      });
      return videos;
    } catch (Error) {
      console.log(Error);
    }
  }  

export async function setOne(collection, key, data) {
    try {
      const collectionRef = db.collection(collection).doc(key);
      await collectionRef.set(data);
      return true;
    } catch (error) {
      console.log('SetOne error is: ', error);
      return { error };
    }
  }

