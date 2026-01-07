"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  CalendarCheck,
  Wallet,
  HeartPulse,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/hooks/use-language"

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { t } = useLanguage();

  const navItems = [
    { href: "/", label: t('nav_dashboard'), icon: LayoutGrid },
    { href: "/roster", label: t('nav_roster'), icon: CalendarCheck },
    { href: "/budget", label: t('nav_budget'), icon: Wallet },
    { href: "/motivation", label: t('nav_motivation'), icon: HeartPulse },
    { href: "/profile", label: t('nav_profile'), icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t md:hidden">
      <ul className="flex justify-around items-center h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href

          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center text-xs gap-1 transition-colors w-16",
                  active
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
