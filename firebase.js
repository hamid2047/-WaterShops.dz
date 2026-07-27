import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDc2jyTOHm93pYrXbLLteOc_XPqu9J-x4k",
  authDomain: "watershop-dz.firebaseapp.com",
  projectId: "watershop-dz",
  storageBucket: "watershop-dz.firebasestorage.app",
  messagingSenderId: "354274691175",
  appId: "1:354274691175:web:5391c1ffcb35735fa5acc2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

export { db, storage };