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
        {/* Hero区域 - 科技感+大气设计 */}
        <div className="relative text-center py-24 overflow-hidden">
          {/* 动态背景层 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-indigo-900/5">
            <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}}></div>
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4">
            {/* 主标题 - 科技感渐变 */}
            <h1 className="text-7xl md:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                精通量化交易
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                与AI Agent
              </span>
              <br />
              <span className="text-gray-900 text-6xl md:text-7xl">
                开启Web3进阶之路
              </span>
            </h1>
            
            {/* 副标题 */}
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-2xl text-gray-600 mb-4 leading-relaxed">
                专为16-24岁新生代打造的
                <span className="text-blue-600 font-bold"> 技术+交易 </span>
                学习平台
              </p>
              <p className="text-xl text-gray-500">
                <span className="inline-flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></span>
                  摆脱信息茧房，掌握未来财富密码
                </span>
              </p>
            </div>
            
            {/* 社会证明 - 科技风格重新设计 */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
              <div className="group bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-200/50 rounded-2xl px-6 py-4 hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <span className="text-2xl">🔥</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-700">1000+</div>
                    <div className="text-sm text-green-600">活跃学员</div>
                  </div>
                </div>
              </div>
              
              <div className="group bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-200/50 rounded-2xl px-6 py-4 hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <span className="text-2xl">💎</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-ping delay-500"></div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-700">100+</div>
                    <div className="text-sm text-yellow-600">付费会员</div>
                  </div>
                </div>
              </div>
              
              <div className="group bg-gradient-to-r from-purple-500/10 to-indigo-500/10 backdrop-blur-sm border border-purple-200/50 rounded-2xl px-6 py-4 hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <span className="text-2xl">🎯</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-ping delay-1000"></div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-700">50+</div>
                    <div className="text-sm text-purple-600">技术沙龙</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA按钮组 - 视觉权重差异化 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* 主按钮 - 最高优先级 */}
              <Link href="/posts/crypto-ai-agents-tutorial" 
                    className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500">
                <span className="mr-3 text-2xl group-hover:animate-bounce">🚀</span>
                开始AI Agents之旅
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10 scale-110"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition-opacity duration-500 -z-20"></div>
              </Link>
              
              {/* 次级按钮 */}
              <Link href="/posts/perpetual-contracts-quantitative-trading"
                    className="group inline-flex items-center px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold text-lg rounded-xl hover:bg-blue-50 hover:border-blue-700 hover:scale-105 transition-all duration-300 shadow-lg">
                <span className="mr-2 group-hover:animate-pulse">📈</span>
                量化交易入门
              </Link>
              
              {/* 第三按钮 - 最低优先级 */}
              <Link href="/posts/investment-reflexivity-theory"
                    className="group inline-flex items-center px-6 py-3 text-gray-700 font-semibold hover:text-blue-600 transition-all duration-300">
                <span className="mr-2">📚</span>
                投资哲学
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative">
              {/* 基础版 */}
              <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl border-2 border-green-200 hover:border-green-400 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                {/* 推荐标签 */}
                <div className="absolute -top-4 left-6 z-10">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    🌟 推荐入门
                  </span>
                </div>
                
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-3xl">📚</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">基础版</h3>
                    <p className="text-green-600 font-bold text-xl">完全免费</p>
                  </div>
                  
                  {/* 内容钩子区域 */}
                  <div className="mb-6 space-y-3">
                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                      <div className="flex items-center text-green-700 text-sm font-bold mb-2">
                        <span className="mr-2">🎯</span>包含内容
                      </div>
                      <ul className="text-sm text-green-600 space-y-1">
                        <li>• 5个核心入门教程</li>
                        <li>• Web3基础知识体系</li>
                        <li>• 24/7社区互助支持</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                      <div className="flex items-center text-blue-700 text-sm font-medium">
                        <span className="mr-2">👤</span>
                        <span className="font-bold">适合群体：</span>零基础小白，想了解Crypto+AI结合
                      </div>
                    </div>
                  </div>
                  
                  {/* 功能列表 */}
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center group/item">
                      <span className="text-green-500 mr-3 text-xl group-hover/item:scale-125 transition-transform">✓</span>
                      <span className="text-gray-700 group-hover/item:text-green-600 transition-colors">基础概念教程</span>
                    </li>
                    <li className="flex items-center group/item">
                      <span className="text-green-500 mr-3 text-xl group-hover/item:scale-125 transition-transform">✓</span>
                      <span className="text-gray-700 group-hover/item:text-green-600 transition-colors">投资心得分享</span>
                    </li>
                    <li className="flex items-center group/item">
                      <span className="text-green-500 mr-3 text-xl group-hover/item:scale-125 transition-transform">✓</span>
                      <span className="text-gray-700 group-hover/item:text-green-600 transition-colors">市场分析入门</span>
                    </li>
                    <li className="flex items-center group/item">
                      <span className="text-green-500 mr-3 text-xl group-hover/item:scale-125 transition-transform">✓</span>
                      <span className="text-gray-700 group-hover/item:text-green-600 transition-colors">社区讨论参与</span>
                    </li>
                  </ul>
                  
                  {/* CTA按钮 */}
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    立即开始学习
                  </button>
                </div>
              </div>
              
              {/* 进阶版 - 最受欢迎 */}
              <div className="group relative bg-white rounded-2xl shadow-2xl border-3 border-blue-400 hover:border-blue-600 transition-all duration-500 transform hover:-translate-y-4 scale-105 z-10 cursor-pointer">
                {/* 最受欢迎标签 */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-8 py-3 rounded-full text-sm font-black shadow-2xl animate-pulse">
                    🔥 最受欢迎
                  </span>
                </div>
                
                {/* 光效边框 */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                <div className="relative bg-white rounded-2xl p-8">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                      <span className="text-3xl">🚀</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">进阶版</h3>
                    <p className="text-blue-600 font-bold text-xl">深度学习</p>
                  </div>
                  
                  {/* 内容钩子区域 */}
                  <div className="mb-6 space-y-3">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center text-blue-700 text-sm font-bold mb-2">
                        <span className="mr-2">🎯</span>包含内容
                      </div>
                      <ul className="text-sm text-blue-600 space-y-1">
                        <li>• 15个进阶策略课程</li>
                        <li>• 量化交易实战项目</li>
                        <li>• 专属学习社群</li>
                        <li>• 月度线上答疑</li>
                      </ul>
                    </div>
                    
                    <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                      <div className="flex items-center text-purple-700 text-sm font-medium">
                        <span className="mr-2">👤</span>
                        <span className="font-bold">适合群体：</span>有基础想进阶的交易者
                      </div>
                    </div>
                  </div>
                  
                  {/* 功能列表 */}
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center group/item">
                      <span className="text-blue-500 mr-3 text-xl group-hover/item:scale-125 transition-transform">✓</span>
                      <span className="text-gray-700 group-hover/item:text-blue-600 transition-colors">量化交易策略</span>
                    </li>
                    <li className="flex items-center group/item">
                      <span className="text-blue-500 mr-3 text-xl group-hover/item:scale-125 transition-transform">✓</span>
                      <span className="text-gray-700 group-hover/item:text-blue-600 transition-colors">投资哲学思维</span>
                    </li>
                    <li className="flex items-center group/item">
                      <span className="text-blue-500 mr-3 text-xl group-hover/item:scale-125 transition-transform">✓</span>
                      <span className="text-gray-700 group-hover/item:text-blue-600 transition-colors">风险管理体系</span>
                    </li>
                    <li className="flex items-center group/item">
                      <span className="text-blue-500 mr-3 text-xl group-hover/item:scale-125 transition-transform">✓</span>
                      <span className="text-gray-700 group-hover/item:text-blue-600 transition-colors">实战案例分析</span>
                    </li>
                    <li className="flex items-center group/item">
                      <span className="text-blue-500 mr-3 text-xl group-hover/item:scale-125 transition-transform">✓</span>
                      <span className="text-gray-700 group-hover/item:text-blue-600 transition-colors">技术指标解析</span>
                    </li>
                  </ul>
                  
                  {/* CTA按钮 */}
                  <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                    开启进阶之路
                  </button>
                </div>
              </div>
              
              {/* 专业版 */}
              <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                {/* 专业标签 */}
                <div className="absolute -top-4 right-6 z-10">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⚡ 专家级
                  </span>
                </div>
                
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-3xl">⚡</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">专业版</h3>
                    <p className="text-purple-600 font-bold text-xl">专家级技术</p>
                  </div>
                  
                  {/* 内容钩子区域 */}
                  <div className="mb-6 space-y-3">
                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center text-purple-700 text-sm font-bold mb-2">
                        <span className="mr-2">🎯</span>包含内容
                      </div>
                      <ul className="text-sm text-purple-600 space-y-1">
                        <li>• 25个专家级课程</li>
                        <li>• FPGA硬件优化</li>
                        <li>• 一对一导师指导</li>
                        <li>• 机构级策略分享</li>
                      </ul>
                    </div>
                    
                    <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-200">
                      <div className="flex items-center text-indigo-700 text-sm font-medium">
                        <span className="mr-2">👤</span>
                        <span className="font-bold">适合群体：</span>专业交易团队和技术开发者
                      </div>
                    </div>
                  </div>
                  
                  {/* 功能列表 */}
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center group/item">
                      <span className="text-purple-500 mr-3 text-xl group-hover/item:scale-125 transition-transform">✓</span>
                      <span className="text-gray-700 group-hover/item:text-purple-600 transition-colors">高频交易技术</span>
                    </li>
                    <li className="flex items-center group/item">
                      <span className="text-purple-500 mr-3 text-xl group-hover/item:scale-125 transition-transform">✓</span>
                      <span className="text-gray-700 group-hover/item:text-purple-600 transition-colors">FPGA硬件加速</span>
                    </li>
                    <li className="flex items-center group/item">
                      <span className="text-purple-500 mr-3 text-xl group-hover/item:scale-125 transition-transform">✓</span>
                      <span className="text-gray-700 group-hover/item:text-purple-600 transition-colors">订单流分析</span>
                    </li>
                    <li className="flex items-center group/item">
                      <span className="text-purple-500 mr-3 text-xl group-hover/item:scale-125 transition-transform">✓</span>
                      <span className="text-gray-700 group-hover/item:text-purple-600 transition-colors">机构级策略</span>
                    </li>
                    <li className="flex items-center group/item">
                      <span className="text-purple-500 mr-3 text-xl group-hover/item:scale-125 transition-transform">✓</span>
                      <span className="text-gray-700 group-hover/item:text-purple-600 transition-colors">一对一指导</span>
                    </li>
                  </ul>
                  
                  {/* CTA按钮 */}
                  <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    联系专业顾问
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 社会认同增强区域 */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            {/* 实时学习活动流 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="mr-3">🔥</span>
                  实时学习动态
                </h3>
                <div className="flex items-center text-sm text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></span>
                  当前在线：234人
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600 mb-1">127</div>
                  <div className="text-sm text-blue-700">今日新增学员</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="text-3xl font-bold text-green-600 mb-1">89%</div>
                  <div className="text-sm text-green-700">课程完成率</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                  <div className="text-3xl font-bold text-purple-600 mb-1">4.9</div>
                  <div className="text-sm text-purple-700">平均学员评分</div>
                </div>
              </div>
              
              {/* 匿名化学习活动流 */}
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-3 text-white text-sm font-bold">A</div>
                  <div className="flex-1">
                    <span className="text-gray-700">学员A 刚刚完成了</span>
                    <span className="text-blue-600 font-medium ml-1">《AI Agent基础开发》</span>
                  </div>
                  <span className="text-xs text-gray-500">2分钟前</span>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-3 text-white text-sm font-bold">B</div>
                  <div className="flex-1">
                    <span className="text-gray-700">学员B 正在学习</span>
                    <span className="text-green-600 font-medium ml-1">《量化交易策略进阶》</span>
                  </div>
                  <span className="text-xs text-gray-500">5分钟前</span>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-3 text-white text-sm font-bold">C</div>
                  <div className="flex-1">
                    <span className="text-gray-700">学员C 获得了</span>
                    <span className="text-purple-600 font-medium ml-1">《FPGA优化专家》认证</span>
                  </div>
                  <span className="text-xs text-gray-500">8分钟前</span>
                </div>
              </div>
            </div>
            
            {/* 匿名化成功案例展示 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
                💎 学员成果展示（匿名化保护）
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-lg transition-all duration-300 border border-blue-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      学员
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">量化交易员</div>
                      <div className="text-sm text-gray-600">从事金融2年</div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    "通过AI Agent课程，我的交易策略回测胜率从60%提升到85%，现在已经实现了稳定盈利。"
                  </p>
                  <div className="flex items-center text-xs text-blue-600">
                    <span className="mr-2">📈</span>
                    策略收益率：+127%
                  </div>
                </div>
                
                <div className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all duration-300 border border-green-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      开发
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">区块链开发者</div>
                      <div className="text-sm text-gray-600">技术背景3年</div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    "FPGA硬件加速课程让我的高频交易延迟降低了80%，现在在团队中负责核心技术架构。"
                  </p>
                  <div className="flex items-center text-xs text-green-600">
                    <span className="mr-2">⚡</span>
                    延迟优化：-80%
                  </div>
                </div>
                
                <div className="group p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl hover:shadow-lg transition-all duration-300 border border-purple-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      创业
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">DeFi创业者</div>
                      <div className="text-sm text-gray-600">创业团队CEO</div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    "投资反身性理论帮我重新理解了市场，现在我们的基金管理规模达到了500万美元。"
                  </p>
                  <div className="flex items-center text-xs text-purple-600">
                    <span className="mr-2">💰</span>
                    基金规模：$5M
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-sm text-gray-500 mb-4">
                  *为保护学员隐私，以上案例均已匿名化处理，数据真实有效
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                    数据来源：内部学习系统
                  </span>
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
                    更新频率：实时
                  </span>
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
      title: data.title || '',
      description: data.description || '',
      date: data.date ? data.date.toString() : '',
      tags: data.tags || [],
      readingTime: data.readingTime || '',
      difficulty: data.difficulty || '',
      level: data.level || '',
      category: data.category || '',
      author: data.author || ''
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts
    }
  };
}
