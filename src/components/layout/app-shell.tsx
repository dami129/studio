
"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import {
  Calendar,
  HeartPulse,
  LayoutDashboard,
  User,
  Wallet,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLanguage } from "@/hooks/use-language";

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
            variant="default"
            size="default"
            className="justify-start"
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
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar collapsible="icon">
        <SidebarHeader className="hidden md:flex items-center gap-3 p-4">
          <div className="w-[44px] h-[44px] rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-105">
            <Icons.logo className="w-[26px] h-[26px] text-primary dark:filter dark:brightness-125" />
          </div>
          <div className="flex flex-col">
            <h3 className="m-0 text-[15px] font-semibold text-gray-800 dark:text-slate-200">NurseCare</h3>
            <span className="text-xs text-gray-500 dark:text-slate-400">Sri Lanka</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
