
import { LayoutGrid, CalendarCheck, Wallet, HeartPulse, User } from "lucide-react";

export const navItems = [
    { href: "/", labelKey: "nav_dashboard", icon: LayoutGrid },
    { href: "/roster", labelKey: "nav_roster", icon: CalendarCheck },
    { href: "/budget", labelKey: "nav_budget", icon: Wallet },
    { href: "/motivation", labelKey: "nav_motivation", icon: HeartPulse },
    { href: "/profile", labelKey: "nav_profile", icon: User },
];
