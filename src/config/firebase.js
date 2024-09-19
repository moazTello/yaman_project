import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

// const firebaseConfig = {
// apiKey: import.meta.env.VITE_API_KEY,
// authDomain: import.meta.env.VITE_AUTHDOMAIN,
// projectId: import.meta.env.VITE_PROJECT_ID,
// storageBucket: import.meta.env.VITE_STORAGEBUCKET,
// messagingSenderId: import.meta.env.VITE_MESSAGINGSENDER_ID,
// appId: import.meta.env.VITE_APP_ID,
// measurementId: import.meta.env.VITE_MEASUREMENT_ID,
// };
// process.env.REACT_APP_NOT_SECRET_CODE

// const firebaseConfig = {
//   apiKey: import.meta.env.REACT_APP_API_KEY,
//   authDomain: import.meta.env.REACT_APP_AUTHDOMAIN,
//   projectId: import.meta.env.REACT_APP_PROJECT_ID,
//   storageBucket: import.meta.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: import.meta.env.REACT_APP_MESSAGINGSENDER_ID,
//   appId: import.meta.env.REACT_APP_APP_ID,
//   measurementId: import.meta.env.REACT_APP_MEASUREMENT_ID,
// };
