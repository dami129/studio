// src/firebase/client-provider.tsx
'use client';
import { useState, useEffect } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

import { FirebaseProvider, type FirebaseContextType } from './provider';
import { initializeFirebase } from './index';
import { UserProvider } from './auth/use-user';
import { signInAnonymously } from 'firebase/auth';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [firebase, setFirebase] = useState<FirebaseContextType | null>(null);

  useEffect(() => {
    const init = async () => {
      const firebaseInstance = await initializeFirebase();
      setFirebase(firebaseInstance);

      // Sign in user anonymously
      try {
        await signInAnonymously(firebaseInstance.auth);
      } catch (error) {
        console.error("Anonymous sign-in failed:", error);
      }

    };
    init();
  }, []);

  if (!firebase) {
    // You can return a loader here if you want
    return null;
  }

  return (
    <FirebaseProvider {...firebase}>
        <UserProvider>
            {children}
        </UserProvider>
    </FirebaseProvider>
  );
}
