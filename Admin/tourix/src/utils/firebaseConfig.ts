// src/utils/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAhLOneklGY-XzP3SsdViLjAChj_8GUGH4",
    authDomain: "urbanixphotos.firebaseapp.com",
    projectId: "urbanixphotos",
    storageBucket: "urbanixphotos.appspot.com",
    messagingSenderId: "150152612285",
    appId: "1:150152612285:web:50b483219239cdded3aad4",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage, firebaseApp };