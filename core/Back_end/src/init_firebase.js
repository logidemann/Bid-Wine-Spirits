//Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, set, get, child, update} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

//Firebase creadentials
const firebaseConfig = {
    apiKey: "AIzaSyDFx7Zr5_HngM5FuilwtkHMbB2uyYgDcTA",
    authDomain: "bid-wine-spirits.firebaseapp.com",
    databaseURL: "https://bid-wine-spirits-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bid-wine-spirits",
    storageBucket: "bid-wine-spirits.appspot.com",
    messagingSenderId: "860934956760",
    appId: "1:860934956760:web:2bf640930ad4605bda99ad"
  };

//Initialize application (Firebase) with firebase credentials
const app = initializeApp(firebaseConfig);

//Export
export const auth = getAuth(app);
export const sign_in_with_email_and_password = signInWithEmailAndPassword;
export const create_user_with_email_and_password = createUserWithEmailAndPassword;
export const send_password_reset_email = sendPasswordResetEmail;
export const db = getDatabase();
export const reference = ref;
export const setter = set;
export const getter = get;
export const db_ref = ref(db);
export const children = child;
export const updater = update;
export const storage = getStorage();
export const storage_ref = sRef;
export const upload = uploadBytes;
export const download = getDownloadURL;