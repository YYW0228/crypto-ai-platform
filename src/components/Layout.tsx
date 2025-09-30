import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { SearchBox, MobileSearchOverlay } from './SearchBox';
import { PriceBanner } from './PriceWidget';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 价格横幅 */}
      <PriceBanner />
      
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Crypto × AI
            </Link>
            
            {/* 桌面端搜索 */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchBox />
            </div>
            
            {/* 导航菜单 */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex space-x-6">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  首页
                </Link>
                <Link href="/posts/crypto-ai-agents-tutorial" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  教程
                </Link>
                <Link href="/posts/perpetual-contracts-quantitative-trading" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  量化
                </Link>
                <a href="#newsletter" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  订阅
                </a>
              </div>
              
              {/* 移动端搜索按钮 */}
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="md:hidden p-2 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>
      
      {/* 移动端搜索覆盖层 */}
      <MobileSearchOverlay 
        isOpen={isMobileSearchOpen} 
        onClose={() => setIsMobileSearchOpen(false)} 
      />
      
      <main>
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
