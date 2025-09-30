import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Post {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  readingTime?: string;
  difficulty?: string;
  level?: string;
  category?: string;
  author?: string;
}

export default function Home({ posts }: { posts: Post[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Crypto × AI 学习平台",
    "description": "学习量化交易、AI Agent 开发和 Web3 技术，摆脱信息茧房",
    "url": "https://yourdomain.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://yourdomain.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Head>
        <title>Crypto x AI 学习平台 - 量化交易与AI Agent开发教程</title>
        <meta name="description" content="专业的Crypto与AI结合学习平台，提供量化交易、AI Agent开发、Web3技术深度教程，助你掌握未来科技趋势" />
        <meta name="keywords" content="Crypto, AI Agent, 量化交易, Web3, 区块链, 人工智能, DeFi, 加密货币投资" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Crypto × AI 学习平台" />
        <meta property="og:description" content="学习量化交易、AI Agent 开发和 Web3 技术，摆脱信息茧房" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:site_name" content="Crypto × AI 学习平台" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crypto × AI 学习平台" />
        <meta name="twitter:description" content="学习量化交易、AI Agent 开发和 Web3 技术" />
        
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            欢迎来到 Crypto x AI 学习平台
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            学习量化交易、AI Agent 开发和 Web3 技术，摆脱信息茧房
          </p>
          
          {/* 社会证明数据展示 */}
          <div className="flex justify-center items-center space-x-8 mb-8 text-sm text-gray-700">
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">🔥 1000+</span>
              <span>活跃用户</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold">💎 100+</span>
              <span>付费会员</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">🎯 50+</span>
              <span>线下沙龙</span>
            </div>
          </div>
          
          <div className="space-x-4">
            <Link href="/posts/crypto-ai-agents-tutorial" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              🚀 AI Agents 教程
            </Link>
            <Link href="/posts/perpetual-contracts-quantitative-trading" className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              📈 量化交易
            </Link>
            <Link href="/posts/2025-09-30-five-lessons" className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors">
              📚 投资心得
            </Link>
          </div>
        </div>
        
        {/* 学习路径导航 */}
        <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              🎯 分级学习体系
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              从基础概念到专家实战，我们为不同水平的学习者提供完整的进阶路径
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* 基础版 */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200 hover:border-green-400 transition-colors">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">基础版</h3>
                  <p className="text-green-600 font-semibold">免费学习</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>基础概念教程</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>投资心得分享</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>市场分析入门</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>社区讨论参与</li>
                </ul>
                <div className="text-center">
                  <span className="text-green-600 font-medium">适合：初学者</span>
                </div>
              </div>
              
              {/* 进阶版 */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200 hover:border-blue-400 transition-colors transform hover:scale-105">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">进阶版</h3>
                  <p className="text-blue-600 font-semibold">深度学习</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span>量化交易策略</li>
                  <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span>投资哲学思维</li>
                  <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span>风险管理体系</li>
                  <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span>实战案例分析</li>
                  <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span>技术指标解析</li>
                </ul>
                <div className="text-center">
                  <span className="text-blue-600 font-medium">适合：有基础的交易者</span>
                </div>
              </div>
              
              {/* 专业版 */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">专业版</h3>
                  <p className="text-purple-600 font-semibold">专家级技术</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span>高频交易技术</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span>FPGA硬件加速</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span>订单流分析</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span>机构级策略</li>
                  <li className="flex items-center"><span className="text-purple-500 mr-2">✓</span>一对一指导</li>
                </ul>
                <div className="text-center">
                  <span className="text-purple-600 font-medium">适合：专业交易团队</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 特色文章区域 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              🔥 精选文章
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow article-card">
                  <div className="p-6">
                    {/* 难度等级标识 */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors flex-1">
                        <Link href={`/posts/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      {post.difficulty && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                          post.difficulty === '专家级' ? 'bg-purple-100 text-purple-800' :
                          post.difficulty === '高级' ? 'bg-red-100 text-red-800' :
                          post.difficulty === '中高级' ? 'bg-orange-100 text-orange-800' :
                          post.difficulty === '中级' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {post.difficulty}
                        </span>
                      )}
                    </div>
                    
                    {/* 版本标识 */}
                    {post.level && (
                      <div className="mb-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          post.level === '专业版' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                          post.level === '进阶版' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' :
                          'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        }`}>
                          {post.level}
                        </span>
                      </div>
                    )}
                    
                    {post.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <time dateTime={post.date}>
                        📅 {post.date}
                      </time>
                      {post.readingTime && (
                        <span>⏱️ {post.readingTime}</span>
                      )}
                    </div>
                    
                    {post.tags && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs hover:bg-gray-200 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">💹 量化交易</h3>
            <p className="text-gray-600">学习算法交易策略，利用 AI 优化投资决策，提升交易效率</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">🤖 AI Agent</h3>
            <p className="text-gray-600">构建智能代理，自动化复杂的业务流程，实现人机协作</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">🌐 Web3 技术</h3>
            <p className="text-gray-600">掌握区块链开发，拥抱去中心化未来，探索新商业模式</p>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'content/posts');
  const filenames = fs.readdirSync(postsDir);
  
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title,
      description: data.description,
      date: data.date ? data.date.toString() : '',
      tags: data.tags || [],
      readingTime: data.readingTime,
      difficulty: data.difficulty,
      level: data.level,
      category: data.category,
      author: data.author
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts
    }
  };
}
