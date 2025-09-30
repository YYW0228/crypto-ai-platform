import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { trackSearch } from './Analytics';

interface SearchResult {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
}

// 参考CoinDesk、CoinTelegraph的搜索功能
export const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // 模拟搜索API（实际项目中应该连接到真实的搜索服务）
  const mockSearchResults: SearchResult[] = [
    {
      title: "【教程】如何在 Web3 中使用 AI Agents 提升你的 Crypto 投资效率",
      slug: "crypto-ai-agents-tutorial",
      description: "完整教程：结合 AI Agents 与 Web3 工具，优化你的 Crypto 投资策略",
      category: "教程",
      tags: ["AI Agents", "Web3", "投资策略"]
    },
    {
      title: "【深度分析】为什么某些交易所必然存在延迟？",
      slug: "crypto-exchange-latency-analysis",
      description: "深入解析加密货币交易所延迟产生的根本原因",
      category: "技术分析",
      tags: ["交易所", "延迟", "技术"]
    },
    {
      title: "【专家级】时间差套利深度剖析",
      slug: "arbitrage-time-difference-analysis",
      description: "从物理定律到FPGA硬件加速的终极指南",
      category: "高级教程",
      tags: ["套利", "FPGA", "高频交易"]
    },
    {
      title: "【哲学思维】投资的反身性",
      slug: "investment-reflexivity-theory",
      description: "深度解析索罗斯反身性理论在加密货币投资中的应用",
      category: "投资哲学",
      tags: ["反身性", "投资理论", "索罗斯"]
    },
    {
      title: "【实战指南】永续合约与量化交易学习方向标",
      slug: "perpetual-contracts-quantitative-trading",
      description: "从入门到精通的完整路径",
      category: "实战教程",
      tags: ["永续合约", "量化交易", "学习路径"]
    }
  ];

  const performSearch = async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const filtered = mockSearchResults.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    setResults(filtered);
    setIsLoading(false);
    
    // 追踪搜索行为
    trackSearch(searchQuery, filtered.length);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <mark key={index} className="bg-yellow-200 px-1">{part}</mark> : 
        part
    );
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="搜索文章、教程、策略..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg className="animate-spin h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>

      {/* 搜索结果下拉框 */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>搜索中...</span>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <Link
                  key={index}
                  href={`/posts/${result.slug}`}
                  className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                        {highlightMatch(result.title, query)}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {highlightMatch(result.description, query)}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {result.category}
                        </span>
                        {result.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <div className="mb-2">🔍</div>
              <p>没有找到相关内容</p>
              <p className="text-sm mt-1">试试其他关键词</p>
            </div>
          )}
          
          {/* 搜索建议 */}
          {results.length > 0 && (
            <div className="border-t border-gray-100 p-3 bg-gray-50">
              <p className="text-xs text-gray-600 text-center">
                找到 {results.length} 个结果 • 按回车查看全部
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 移动端搜索覆盖层
export const MobileSearchOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">搜索</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <SearchBox />
      </div>
    </div>
  );
};