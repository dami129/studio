'use client';

import * as React from 'react';
import type { UserProfile } from '@/lib/types';
import { useLocalStorage } from './use-local-storage';

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
  const [user, setUser] = useLocalStorage<UserProfile>('userProfile', initialUser);

  const updateUser = (newUserData: Partial<UserProfile>) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserData }));
  };
  
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
