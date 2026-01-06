"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import { useProfile } from "@/hooks/use-profile"

function ThemeWatcher() {
  const { theme } = useTheme()
  const { updateUser } = useProfile()

  React.useEffect(() => {
    // This updates the profile when the system theme changes
    // or when the theme is changed from somewhere else.
    updateUser({ theme: theme as "light" | "dark" | "system" })
  }, [theme, updateUser])

  return null
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { user } = useProfile()

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
      forcedTheme={user.theme}
    >
      <ThemeWatcher />
      {children}
    </NextThemesProvider>
  )
}
