
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/use-profile";
import { navItems } from "./nav-items";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

export default function DesktopSidebar() {
  const pathname = usePathname();
  const { user, avatar } = useProfile();
  const { t } = useLanguage();

  return (
    <div className="hidden md:block">
       <SidebarProvider>
        <Sidebar className="border-r">
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Icons.logo className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-semibold">NurseCare</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className="w-full justify-start"
                    >
                      <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{t(item.labelKey)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <Link href="/profile">
              <div className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-sidebar-accent">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </Link>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
