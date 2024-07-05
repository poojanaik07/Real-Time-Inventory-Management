

import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQekxx61to86ZPVSHNoVX8XmkNcGdgXpM",
  authDomain: "einnobuild.firebaseapp.com",
  projectId: "einnobuild",
  storageBucket: "einnobuild.appspot.com",
  messagingSenderId: "807589407617",
  appId: "1:807589407617:web:7819d471894d11be47d680",
  
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app;