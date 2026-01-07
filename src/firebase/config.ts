// src/firebase/config.ts
import type { FirebaseOptions } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY") {
  const config = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;
  if (config) {
    try {
      const parsedConfig = JSON.parse(config);
      firebaseConfig.apiKey = parsedConfig.apiKey;
      firebaseConfig.authDomain = parsedConfig.authDomain;
      firebaseConfig.projectId = parsedConfig.projectId;
      firebaseConfig.storageBucket = parsedConfig.storageBucket;
      firebaseConfig.messagingSenderId = parsedConfig.messagingSenderId;
      firebaseConfig.appId = parsedConfig.appId;
    } catch (e) {
        console.error("Could not parse NEXT_PUBLIC_FIREBASE_CONFIG")
    }
  } else {
      // Fallback for when the env var is not set
      // This is a common case in some development environments
      // You can replace these with your actual config values
  }
}


export default firebaseConfig;
