import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyBqz3lCvPbRNfV6KJ9OhVFwQ7rFVUQtJQU",
    authDomain: "nba-app-dd362.firebaseapp.com",
    projectId: "nba-app-dd362",
    storageBucket: "nba-app-dd362.appspot.com",
    messagingSenderId: "607040772843",
    appId: "1:607040772843:web:4f2a1453916ece2fca7cae"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)