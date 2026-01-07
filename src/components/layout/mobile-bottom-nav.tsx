
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/hooks/use-language"
import { navItems } from "./nav-items"

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t md:hidden">
      <ul className="flex justify-around items-center h-16">
        {navItems.map(({ href, labelKey, icon: Icon }) => {
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
                <span>{t(labelKey)}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
