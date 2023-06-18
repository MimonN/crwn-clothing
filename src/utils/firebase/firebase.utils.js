import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBtrvCgjHPS3xNlTW3t-ZwEdZn576fI2CI',
  authDomain: 'crwn-clothing-db-67128.firebaseapp.com',
  projectId: 'crwn-clothing-db-67128',
  storageBucket: 'crwn-clothing-db-67128.appspot.com',
  messagingSenderId: '846849725318',
  appId: '1:846849725318:web:16348f6910677d1c0f9207',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const cratedAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        cratedAt,
      });
    } catch (error) {
      console.log('error crating the user', error.message);
    }
  }

  return userDocRef;
};
