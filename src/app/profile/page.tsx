
"use client";

import { ProfileForm } from "@/components/profile/profile-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import * as React from "react";
import { AvatarManager } from "@/components/profile/avatar-manager";
import { useToast } from "@/hooks/use-toast";

const initialUser = {
    name: "Ayesha Perera",
    email: "ayesha.p@email.com",
    hospital: "General Hospital, Colombo",
    ward: "Surgical",
    monthlyGoal: "Complete my advanced CPR certification.",
    language: "English",
    notifications: {
        dutyReminders: true,
        budgetAlerts: true,
        dailyMotivation: false,
    }
};

export default function ProfilePage() {
    const { toast } = useToast();
    const [user, setUser] = React.useState(initialUser);
    const [avatar, setAvatar] = React.useState("https://picsum.photos/seed/nurse/200");
    const [isAvatarManagerOpen, setIsAvatarManagerOpen] = React.useState(false);

    React.useEffect(() => {
        const savedAvatar = localStorage.getItem('user-avatar');
        if (savedAvatar) {
            setAvatar(savedAvatar);
        }
        const savedUser = localStorage.getItem('user-profile');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to parse user profile from localStorage", e);
            }
        }
    }, []);

    const handleAvatarChange = (newAvatar: string) => {
        setAvatar(newAvatar);
        localStorage.setItem('user-avatar', newAvatar);
        setIsAvatarManagerOpen(false);
         toast({
            title: "Avatar Updated",
            description: "Your new profile photo has been saved.",
        });
    };

    const handleProfileSave = (updatedUser: typeof user) => {
        setUser(updatedUser);
        localStorage.setItem('user-profile', JSON.stringify(updatedUser));
        toast({
            title: "Profile Saved",
            description: "Your changes have been saved successfully.",
        });
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground/90">
                User Profile
                </h1>
                <p className="text-muted-foreground mt-1">
                Manage your personal information and app settings.
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background/80 hover:bg-background"
                        onClick={() => setIsAvatarManagerOpen(true)}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
            </div>

            <ProfileForm user={user} onSave={handleProfileSave} />

            <AvatarManager 
                isOpen={isAvatarManagerOpen}
                onOpenChange={setIsAvatarManagerOpen}
                currentAvatar={avatar}
                onAvatarChange={handleAvatarChange}
            />
        </div>
    );
}
