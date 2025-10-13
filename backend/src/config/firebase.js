const admin = require("firebase-admin");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

let db = null;

const initializeFirebase = () => {
  try {
    if (admin.apps.length === 0) {
      const serviceAccount = require("../../serviceAccountKey.json");

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      });
    }

    db = admin.firestore();
    console.log("✅ Firebase conectado com sucesso");
    return db;
  } catch (error) {
    console.error("❌ Erro ao conectar Firebase:", error.message);
    throw error;
  }
};

const getDb = () => {
  if (!db) {
    throw new Error(
      "Firebase não foi inicializado. Chame initializeFirebase() primeiro."
    );
  }
  return db;
};

const getFieldValue = () => admin.firestore.FieldValue;

module.exports = {
  initializeFirebase,
  getDb,
  getFieldValue,
  admin,
};
