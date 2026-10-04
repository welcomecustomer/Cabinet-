// Firebase.sync.js
  
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

// ===============================
// FIREBASE CONFIGURATION
// ===============================

const firebaseConfig = {
  apiKey: "AIzaB4kERqolbdbiQT9bUfpPGt8BEEJoMqQrI",
  authDomain: "cabinet-b89db.firebaseapp.com",
  databaseURL: "https://cabinet-b89db-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cabinet-b89db",
  storageBucket: "cabinet-b89db.firebasestorage.app",
  messagingSenderId: "569650384040",
  appId: "1:569650384040:web:78475c9af11656699b469d",
  measurementId: "G-C9F5CLC31X"
};

// ===============================
// INITIALIZE FIREBASE
// ===============================

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ===============================
// DATABASE PATH
// ===============================

const DATABASE_PATH = "cabinetData";

// ===============================
// SAVE ALL DATA
// ===============================

async function saveCabinetData(data) {
  try {
    await set(ref(db, DATABASE_PATH), data);

    console.log("✅ Données sauvegardées dans Firebase");

    return true;
  } catch (error) {
    console.error("❌ Erreur Firebase:", error);

    return false;
  }
}

// ===============================
// LOAD ALL DATA
// ===============================

async function loadCabinetData() {
  try {
    const snapshot = await get(ref(db, DATABASE_PATH));

    if (snapshot.exists()) {
      console.log("✅ Données chargées depuis Firebase");

      return snapshot.val();
    }

    console.log("ℹ️ Aucune donnée Firebase pour le moment");

    return null;

  } catch (error) {
    console.error("❌ Erreur lecture Firebase:", error);

    return null;
  }
}

// ===============================
// LISTEN FOR CHANGES
// ===============================

function listenCabinetData(callback) {
  return onValue(ref(db, DATABASE_PATH), (snapshot) => {

    if (snapshot.exists()) {
      callback(snapshot.val());
    }

  });
} 

// ===============================
// MAKE AVAILABLE TO THE APP
// ===============================

window.FirebaseCabinet = {
  saveCabinetData,
  loadCabinetData,
  listenCabinetData
};

console.log("🔥 Firebase Cabinet connecté !");