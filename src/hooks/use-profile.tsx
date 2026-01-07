'use client';

import * as React from 'react';
import type { UserProfile } from '@/lib/types';
import { useUser } from '@/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

const initialUser: UserProfile = {
  name: 'Ayesha Perera',
  email: 'ayesha.p@email.com',
  hospital: 'General Hospital, Colombo',
  ward: 'Surgical Ward',
  monthlyGoal: 'Complete my advanced CPR certification.',
  language: 'English',
  theme: 'light',
  notifications: {
    dutyReminders: true,
    budgetAlerts: true,
    dailyMotivation: false,
  },
  avatar: 'https://picsum.photos/seed/nurse/200',
};

type ProfileContextType = {
  user: UserProfile;
  updateUser: (newUserData: Partial<UserProfile>) => void;
  avatar: string; // Keep avatar separate for now as it can be large
  updateAvatar: (newAvatar: string) => void;
};

const ProfileContext = React.createContext<ProfileContextType | undefined>(
  undefined
);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user: authUser } = useUser();
  const firestore = useFirestore();
  const [user, setUser] = React.useState<UserProfile>(initialUser);
  const userDocRef = React.useMemo(() => authUser && firestore ? doc(firestore, 'users', authUser.uid) : null, [authUser, firestore]);
  
  React.useEffect(() => {
    if (!userDocRef) {
        setUser(initialUser);
        return;
    };

    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setUser({ ...initialUser, ...docSnap.data() } as UserProfile);
      } else {
        // Document doesn't exist, so create it with initial data
        setDoc(userDocRef, initialUser);
        setUser(initialUser);
      }
    });

    return () => unsubscribe();
  }, [userDocRef]);


  const updateUser = React.useCallback((newUserData: Partial<UserProfile>) => {
      if (!userDocRef) return;
      setDoc(userDocRef, newUserData, { merge: true });
    }, [userDocRef]
  );
  
  // Avatar is part of the user profile now
  const avatar = user.avatar;
  const updateAvatar = (newAvatar: string) => {
    updateUser({ avatar: newAvatar });
  };


  const value = React.useMemo(
    () => ({ user, updateUser, avatar, updateAvatar }),
    [user, updateUser, avatar, updateAvatar]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = React.useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
