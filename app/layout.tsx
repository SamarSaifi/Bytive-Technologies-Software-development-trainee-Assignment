import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { TaskProvider } from '@/context/task-context';
import { ThemeProvider } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';
import { ThemeToggle } from '@/components/theme-toggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Interactive Todo List',
  description: 'A beautiful and responsive todo list application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <TaskProvider>
            <div className="min-h-screen bg-background transition-colors duration-300">
              <nav className="border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                  <h1 className="text-xl font-bold">Todo List</h1>
                  <ThemeToggle />
                </div>
              </nav>
              {children}
            </div>
            <Toaster />
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}