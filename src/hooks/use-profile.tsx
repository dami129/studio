"use client";

import * as React from "react";
import type { UserProfile } from "@/lib/types";

const initialUser: UserProfile = {
    name: "Ayesha Perera",
    email: "ayesha.p@email.com",
    hospital: "General Hospital, Colombo",
    ward: "Surgical Ward",
    monthlyGoal: "Complete my advanced CPR certification.",
    language: "English",
    theme: "light",
    notifications: {
        dutyReminders: true,
        budgetAlerts: true,
        dailyMotivation: false,
    }
};

const initialAvatar = "https://picsum.photos/seed/nurse/200";

type ProfileContextType = {
  user: UserProfile;
  updateUser: (newUserData: Partial<UserProfile>) => void;
  avatar: string;
  updateAvatar: (newAvatar: string) => void;
};

const ProfileContext = React.createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserProfile>(initialUser);
  const [avatar, setAvatar] = React.useState<string>(initialAvatar);

  // Load from localStorage only once on mount
  React.useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user-profile');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(prevUser => ({ ...prevUser, ...parsedUser }));
      }
      const savedAvatar = localStorage.getItem('user-avatar');
      if (savedAvatar) {
        setAvatar(savedAvatar);
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
    }
  }, []);

  const updateUser = React.useCallback((newUserData: Partial<UserProfile>) => {
    setUser(currentUser => {
      const updatedUser = { ...currentUser, ...newUserData };
      try {
        localStorage.setItem('user-profile', JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Failed to save user profile to localStorage", error);
      }
      return updatedUser;
    });
  }, []);


  const updateAvatar = React.useCallback((newAvatar: string) => {
    setAvatar(newAvatar);
    try {
      localStorage.setItem('user-avatar', newAvatar);
    } catch (error) {
      console.error("Failed to save avatar to localStorage", error);
    }
  }, []);

  const value = React.useMemo(() => ({ user, updateUser, avatar, updateAvatar }), [user, updateUser, avatar, updateAvatar]);

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = React.useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
