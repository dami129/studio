import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppShell } from '@/components/layout/app-shell';
import { DutiesProvider } from '@/hooks/use-duties';
import { ExpensesProvider } from '@/hooks/use-expenses';
import { IncomeProvider } from '@/hooks/use-income';

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
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background')}>
        <DutiesProvider>
          <ExpensesProvider>
            <IncomeProvider>
              <SidebarProvider>
                <AppShell>{children}</AppShell>
              </SidebarProvider>
            </IncomeProvider>
          </ExpensesProvider>
        </DutiesProvider>
        <Toaster />
      </body>
    </html>
  );
}
