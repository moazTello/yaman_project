import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBk4GTJK9MuiMD4ScuIi8AUyu8LxOzX7nU",
  authDomain: "yaman-cashier.firebaseapp.com",
  projectId: "yaman-cashier",
  storageBucket: "yaman-cashier.appspot.com",
  messagingSenderId: "694679645054",
  appId: "1:694679645054:web:b33a4a6a2f87dd86e5212f",
  measurementId: "G-85ZRELRX4D",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTHDOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGEBUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGINGSENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID,
// };
// process.env.REACT_APP_NOT_SECRET_CODE
