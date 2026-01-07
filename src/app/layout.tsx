
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { DutiesProvider } from '@/hooks/use-duties';
import { ExpensesProvider } from '@/hooks/use-expenses';
import { IncomeProvider } from '@/hooks/use-income';
import { ProfileProvider } from '@/hooks/use-profile';
import { LanguageProvider } from '@/hooks/use-language';
import { ThemeProvider } from '@/components/layout/theme-provider';
import MobileBottomNav from '@/components/layout/mobile-bottom-nav';
import DesktopSidebar from '@/components/layout/desktop-sidebar';


export const metadata: Metadata = {
  title: 'NurseCare Sri Lanka',
  description: 'Your personal assistant and emotional support companion for nurses.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background')}>
        <ProfileProvider>
          <ThemeProvider>
            <LanguageProvider>
              <DutiesProvider>
                <ExpensesProvider>
                  <IncomeProvider>
                    <div className="flex min-h-screen">
                        <DesktopSidebar />
                        <main className="flex-1 p-4 sm:p-6 pb-20 md:pb-6">
                            {children}
                        </main>
                        <MobileBottomNav />
                    </div>
                  </IncomeProvider>
                </ExpensesProvider>
              </DutiesProvider>
            </LanguageProvider>
          </ThemeProvider>
        </ProfileProvider>
        <Toaster />
      </body>
    </html>
  );
}
