// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzNoxxmfZkDXL8qHFd9_w84mtSe7G-AjE",
  authDomain: "bucketbee-13436.firebaseapp.com",
  projectId: "bucketbee-13436",
  storageBucket: "bucketbee-13436.appspot.com",
  messagingSenderId: "97100103180",
  appId: "1:97100103180:web:a1963b4ae313265bd6f829"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
