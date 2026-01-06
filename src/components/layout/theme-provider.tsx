"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import { useProfile } from "@/hooks/use-profile"

function ThemeWatcher() {
  const { setTheme, theme } = useTheme()
  const { user, updateUser } = useProfile()

  React.useEffect(() => {
    if (user.theme && theme !== user.theme) {
      setTheme(user.theme)
    }
  }, [user.theme, theme, setTheme])

  return null
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const { user } = useProfile()
    
    // By passing a key, we force the provider to re-mount when the theme changes,
    // which is a clean way to ensure the new theme is applied without loops.
    return (
        <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        {...props}
        key={user.theme}
        forcedTheme={user.theme}
        >
        <ThemeWatcher />
        {children}
        </NextThemesProvider>
    )
}
