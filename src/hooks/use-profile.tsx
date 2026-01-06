"use client";

import * as React from "react";
import type { UserProfile } from "@/lib/types";

const initialUser: UserProfile = {
    name: "Ayesha Perera",
    email: "ayesha.p@email.com",
    hospital: "General Hospital, Colombo",
    ward: "Surgical",
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
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user-profile');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        // Merge with initial user to ensure all keys are present
        setUser({ ...initialUser, ...parsedUser });
      }
      const savedAvatar = localStorage.getItem('user-avatar');
      if (savedAvatar) {
        setAvatar(savedAvatar);
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  const updateUser = (newUserData: Partial<UserProfile>) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    if (isLoaded) {
      localStorage.setItem('user-profile', JSON.stringify(updatedUser));
    }
  };

  const updateAvatar = (newAvatar: string) => {
    setAvatar(newAvatar);
    if (isLoaded) {
      localStorage.setItem('user-avatar', newAvatar);
    }
  };

  return (
    <ProfileContext.Provider value={{ user, updateUser, avatar, updateAvatar }}>
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
