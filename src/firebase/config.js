// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe39xVHj549QG7ZK2F87wjiFZDVU7KmgA",
  authDomain: "projeto-filmes-ae9ab.firebaseapp.com",
  projectId: "projeto-filmes-ae9ab",
  storageBucket: "projeto-filmes-ae9ab.firebasestorage.app",
  messagingSenderId: "894071158466",
  appId: "1:894071158466:web:5c7b04a2d303d59b02ad5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db}