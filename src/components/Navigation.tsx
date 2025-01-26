'use client';

import Link from 'next/link';

interface NavigationProps {
  children: React.ReactNode;
}

export default function Navigation({ children }: NavigationProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-[1200px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              JKyEun Blog
            </Link>
          </div>
        </div>
      </nav>
      <div className="pt-20 bg-white shadow-inner">{children}</div>
    </div>
  );
}
