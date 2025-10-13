#!/usr/bin/env node

console.log('🔥 Bem-Estar Backend - Firebase Setup\n');

const fs = require('fs');
const path = require('path');

// Check if serviceAccountKey.json exists
const serviceKeyPath = path.join(__dirname, '..', 'serviceAccountKey.json');
const envPath = path.join(__dirname, '..', '.env');

console.log('📋 Configuration checklist:\n');

// 1. Check serviceAccountKey.json
if (fs.existsSync(serviceKeyPath)) {
  console.log('✅ serviceAccountKey.json found');
  try {
    const keyContent = JSON.parse(fs.readFileSync(serviceKeyPath, 'utf8'));
    if (keyContent.project_id && keyContent.project_id !== 'YOUR_PROJECT_ID_HERE') {
      console.log(`   📁 Project ID: ${keyContent.project_id}`);
    } else {
      console.log('⚠️  serviceAccountKey.json needs to be configured');
    }
  } catch (error) {
    console.log('❌ serviceAccountKey.json is invalid');
  }
} else {
  console.log('❌ serviceAccountKey.json not found');
  console.log('   📥 Download from Firebase Console and rename to serviceAccountKey.json');
}

// 2. Check .env file
if (fs.existsSync(envPath)) {
  console.log('✅ .env file found');
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('bem-estar-app-default-rtdb')) {
    console.log('⚠️  Configure FIREBASE_DATABASE_URL in .env with your Project ID');
  } else {
    console.log('   🔗 .env configuration OK');
  }
} else {
  console.log('❌ .env file not found');
  console.log('   📄 Copy .env.example to .env and configure');
}

// 3. Check node_modules
if (fs.existsSync(path.join(__dirname, '..', 'node_modules'))) {
  console.log('✅ Dependencies installed');
} else {
  console.log('❌ Dependencies not installed');
  console.log('   📦 Run: npm install');
}

console.log('\n🚀 To start the server:');
console.log('   npm start\n');

console.log('📖 Documentation:');
console.log('   - FIREBASE_SETUP.md  (configuration)');
console.log('   - API_EXAMPLES.md    (usage examples)');
console.log('   - README.md          (complete documentation)\n');

console.log('🌐 Important URLs:');
console.log('   - Firebase Console: https://console.firebase.google.com/');
console.log('   - Local API: http://localhost:3000/api');
console.log('   - API Test: http://localhost:3000/\n');