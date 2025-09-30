import { useState } from 'react';
import { trackCTAClick } from './Analytics';

// 参考Decrypt、The Block等顶级网站的Newsletter组件
export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // 追踪订阅尝试
    trackCTAClick('newsletter_signup', 'newsletter_component');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setStatus('success');
        setMessage('🎉 订阅成功！欢迎加入我们的学习社区');
        setEmail('');
        
        // 追踪成功订阅
        trackCTAClick('newsletter_signup_success', 'newsletter_component');
      } else {
        throw new Error('订阅失败');
      }
    } catch (error) {
      setStatus('error');
      setMessage('❌ 订阅失败，请稍后重试');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-4">
          <span className="text-4xl mb-4 block">📧</span>
          <h3 className="text-2xl font-bold mb-2">获取独家深度内容</h3>
          <p className="text-blue-100 mb-6">
            每周获取最新的Crypto×AI研究报告、独家交易策略和行业洞察
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="输入您的邮箱地址"
              required
              className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              disabled={status === 'loading'}
            />
          </div>
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? '订阅中...' : '🚀 免费订阅'}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-sm ${
            status === 'success' ? 'text-green-200' : 'text-red-200'
          }`}>
            {message}
          </p>
        )}

        <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-blue-200">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            10,000+ 订阅者
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            每周深度报告
          </span>
        </div>
      </div>
    </div>
  );
};

// 简化版Newsletter（用于文章底部）
export const InlineNewsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    trackCTAClick('inline_newsletter_signup', 'article_bottom');

    // 模拟API调用
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <span className="text-green-600 font-medium">✅ 订阅成功！期待与您分享更多干货内容</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <span className="text-2xl">💡</span>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">喜欢这篇文章？</h4>
          <p className="text-sm text-gray-600">订阅我们的周报，获取更多独家内容</p>
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="您的邮箱"
            required
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? '...' : '订阅'}
          </button>
        </form>
      </div>
    </div>
  );
};