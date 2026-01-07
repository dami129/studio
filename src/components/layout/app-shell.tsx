
"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  HeartPulse,
  LayoutDashboard,
  User,
  Wallet,
  Menu,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLanguage } from "@/hooks/use-language";
import { useProfile } from "@/hooks/use-profile";

function MainNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: "/", icon: LayoutDashboard, label: t('nav_dashboard') },
    { href: "/roster", icon: Calendar, label: t('nav_roster') },
    { href: "/budget", icon: Wallet, label: t('nav_budget') },
    { href: "/motivation", icon: HeartPulse, label: t('nav_motivation') },
    { href: "/profile", icon: User, label: t('nav_profile') },
  ];

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            variant="ghost"
            className="justify-start data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
      <SidebarTrigger className="md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </SidebarTrigger>
      <div className="flex-1">
        {/* Can add breadcrumbs or page title here */}
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user } = useProfile();

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar collapsible="icon" variant="sidebar">
         <SidebarHeader className="hidden md:flex flex-col items-center gap-4 p-4 text-center">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md transition-transform hover:scale-105 dark:bg-slate-800">
            <Plus className="h-6 w-6" />
            <span className="sr-only">Add</span>
          </button>
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-foreground">NurseCare</h3>
            <span className="text-xs text-muted-foreground">Sri Lanka</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter className="hidden md:flex p-4">
           <Link href="/profile" className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : 'N'}</AvatarFallback>
              </Avatar>
           </Link>
        </SidebarFooter>
      </Sidebar>
      <div className="flex flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
