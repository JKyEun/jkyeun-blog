'use client';

import { NAVIGATION_LIST } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="max-w-[1440px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            JKyEun Blog
          </Link>
          <div className="flex gap-6">
            {NAVIGATION_LIST.map(({ id, title }) => (
              <Link
                key={id}
                href={`/${title.toLowerCase()}`}
                className={`text-lg hover:text-blue-600 transition-colors ${
                  pathname.startsWith(`/${title.toLowerCase()}`) ? 'text-blue-800' : 'text-gray-800'
                }`}>
                {title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
