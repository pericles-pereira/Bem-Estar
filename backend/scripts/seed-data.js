#!/usr/bin/env node

/**
 * Script to create sample data in Firestore
 * Run: node seed-data.js
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const admin = require("firebase-admin");
const bcrypt = require('bcrypt');

console.log("🌱 Creating sample data in Firestore...\n");

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

async function createSampleData() {
  try {
    // 1. Create sample user
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
        registrationDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        shortDescription: "Great day at work!",
        createdAt: new Date().toISOString()
      },
      {
        userId: userRef.id,
        moodType: "Motivado",
        level: 5,
        registrationDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        shortDescription: "Feeling very productive",
        createdAt: new Date().toISOString()
      },
      {
        userId: userRef.id,
        moodType: "Neutro",
        level: 3,
        registrationDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        shortDescription: "Normal day",
        createdAt: new Date().toISOString()
      },
      {
        userId: userRef.id,
        moodType: "Ansioso",
        level: 2,
        registrationDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
        shortDescription: "Worried about project deadline",
        createdAt: new Date().toISOString()
      },
      {
        userId: userRef.id,
        moodType: "Feliz",
        level: 4,
        registrationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        shortDescription: "Weekend with family",
        createdAt: new Date().toISOString()
      }
    ];

    for (const entry of moodEntries) {
      const moodRef = await db.collection("mood_entries").add(entry);
      console.log(`   ✅ Mood entry created: ${moodRef.id} (${entry.moodType})`);
    }

    console.log("\n🎉 Sample data created successfully!");
    console.log("\n� Collections created:");
    console.log("   - users (1 user)");
    console.log("   - mood_entries (5 entries)");

    console.log("\n� To view the data:");
    console.log("   - Firebase Console: https://console.firebase.google.com/");
    console.log("   - API Test: http://localhost:3000/");

    console.log("\n👤 Sample user:");
    console.log("   - ID:", userRef.id);
    console.log("   - Email: sample@test.com");
    console.log("   - Name: Sample User");
  } catch (error) {
    console.error("❌ Error creating data:", error);
  }

  process.exit(0);
}

createSampleData();
