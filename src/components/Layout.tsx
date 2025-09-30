import React from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Crypto x AI
            </Link>
            <div className="space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">首页</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">关于</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">联系</Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Crypto x AI 学习平台. 专注于量化交易与人工智能.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
