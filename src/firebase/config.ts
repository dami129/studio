// src/firebase/config.ts
import type { FirebaseOptions } from 'firebase/app';

const firebaseConfigString = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;

if (!firebaseConfigString) {
    throw new Error('NEXT_PUBLIC_FIREBASE_CONFIG is not set');
}

const firebaseConfig: FirebaseOptions = JSON.parse(firebaseConfigString);

export default firebaseConfig;
