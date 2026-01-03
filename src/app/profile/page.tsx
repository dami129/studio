import { ProfileForm } from "@/components/profile/profile-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
    const user = {
        name: "Ayesha Perera",
        email: "ayesha.p@email.com",
        hospital: "General Hospital, Colombo",
        ward: "Surgical",
        shiftPreference: "Night",
        monthlyGoal: "Complete my advanced CPR certification.",
        language: "English",
        notifications: {
            dutyReminders: true,
            budgetAlerts: true,
            dailyMotivation: false,
        }
    };

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
                <Avatar className="h-20 w-20">
                    <AvatarImage src="https://picsum.photos/seed/nurse/200" alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
            </div>

            <ProfileForm user={user} />
        </div>
    );
}
