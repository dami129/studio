
"use client";

import { ProfileForm } from "@/components/profile/profile-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import * as React from "react";
import { AvatarManager } from "@/components/profile/avatar-manager";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/use-profile";
import { useLanguage } from "@/hooks/use-language";

export default function ProfilePage() {
    const { t } = useLanguage();
    const { toast } = useToast();
    const { user, updateUser, avatar, updateAvatar } = useProfile();
    const [isAvatarManagerOpen, setIsAvatarManagerOpen] = React.useState(false);

    const handleAvatarChange = (newAvatar: string) => {
        updateAvatar(newAvatar);
        setIsAvatarManagerOpen(false);
         toast({
            title: t('avatar_updated_title'),
            description: t('avatar_updated_desc'),
        });
    };

    const handleProfileSave = (updatedUser: typeof user) => {
        updateUser(updatedUser);
        toast({
            title: t('profile_saved_title'),
            description: t('profile_saved_desc'),
        });
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground/90">
                {t('user_profile_title')}
                </h1>
                <p className="text-muted-foreground mt-1">
                {t('user_profile_subtitle')}
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
