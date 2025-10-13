#!/usr/bin/env node

/**
 * Script to reset Firebase database and recreate with updated data
 * Run: npm run reset
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const admin = require("firebase-admin");
const bcrypt = require('bcrypt');

console.log("🔄 Resetting Firebase Firestore database...\n");

// Check if serviceAccountKey.json exists
const fs = require("fs");

const serviceKeyPath = path.join(__dirname, "..", "serviceAccountKey.json");
if (!fs.existsSync(serviceKeyPath)) {
  console.log("❌ serviceAccountKey.json not found");
  console.log("   Configure Firebase first: npm run setup");
  process.exit(1);
}

// Initialize Firebase Admin
try {
  const serviceAccount = require(serviceKeyPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  console.log("✅ Firebase connected");
} catch (error) {
  console.log("❌ Error connecting to Firebase:", error.message);
  process.exit(1);
}

const db = admin.firestore();

// Function to delete an entire collection
async function deleteCollection(collectionName) {
  const batchSize = 100;

  const query = db.collection(collectionName).limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
}

async function resetDatabase() {
  try {
    console.log("🗑️ Deleting existing data...");

    // List all collections
    const collections = [
      "users",
      "mood_entries",
    ];

    for (const collectionName of collections) {
      console.log(`   Deleting collection: ${collectionName}`);
      await deleteCollection(collectionName);
      console.log(`   ✅ ${collectionName} deleted`);
    }

    console.log("\n🌱 Creating updated sample data...");

    // 1. Create sample user with new structure
    console.log("👤 Creating sample user...");
    const userRef = await db.collection("users").add({
      name: "Sample User", 
      email: "sample@test.com",
      password: await bcrypt.hash("password123", 12), 
      registrationDate: admin.firestore.FieldValue.serverTimestamp(),
      loginProvider: "email"
    });
    console.log(`   ✅ User created: ${userRef.id}`);

    // 2. Create sample mood entries
    console.log("😊 Creating sample mood entries...");
    const moodEntries = [
      {
        userId: userRef.id,
        moodType: "Feliz",
        level: 4,
        registrationDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        shortDescription: "Great day at work!",
        createdAt: new Date().toISOString()
      },
      {
        userId: userRef.id,
        moodType: "Motivado",
        level: 5,
        registrationDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        shortDescription: "Feeling very productive",
        createdAt: new Date().toISOString()
      },
      {
        userId: userRef.id,
        moodType: "Neutro",
        level: 3,
        registrationDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        shortDescription: "Normal day",
        createdAt: new Date().toISOString()
      },
      {
        userId: userRef.id,
        moodType: "Ansioso",
        level: 2,
        registrationDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        shortDescription: "Worried about project deadline",
        createdAt: new Date().toISOString()
      },
      {
        userId: userRef.id,
        moodType: "Feliz",
        level: 4,
        registrationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        shortDescription: "Weekend with family",
        createdAt: new Date().toISOString()
      },
      {
        userId: userRef.id,
        moodType: "Triste",
        level: 1,
        registrationDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        shortDescription: "Difficult day",
        createdAt: new Date().toISOString()
      },
      {
        userId: userRef.id,
        moodType: "Motivado",
        level: 5,
        registrationDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        shortDescription: "Started new project",
        createdAt: new Date().toISOString()
      }
    ];

    for (const entry of moodEntries) {
      const moodRef = await db.collection("mood_entries").add(entry);
      console.log(`   ✅ Mood entry created: ${moodRef.id} (${entry.moodType})`);
    }

    console.log("\n🎉 Reset completed successfully!");
    console.log("\n📊 Data created:");
    console.log('   - users (1 user with updated structure)');
    console.log("   - mood_entries (7 entries)");

    console.log("\n🔍 To verify:");
    console.log("   - Firebase Console: https://console.firebase.google.com/");
    console.log("   - API: http://localhost:3000/");

    console.log("\n👤 Sample user:");
    console.log("   - ID:", userRef.id);
    console.log("   - Email: sample@test.com");
    console.log("   - Name: Sample User");
  } catch (error) {
    console.error("❌ Error during reset:", error);
  }

  process.exit(0);
}

resetDatabase();
