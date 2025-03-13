import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB_6Qv_ZuHcDlC2yXcFrvlSafkDMxTwLcM",
    authDomain: "verba-a2375.firebaseapp.com",
    projectId: "verba-a2375",
    storageBucket: "verba-a2375.firebasestorage.app",
    messagingSenderId: "169694839308",
    appId: "1:169694839308:web:c1e7b21f06031f2540a429"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth y el proveedor de Google
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
