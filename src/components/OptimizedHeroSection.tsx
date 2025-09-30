import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

/**
 * 优化后的 Hero Section - 基于 Chainlink 专业设计
 * 特点：科技感、高转化率、移动端友好
 */
export default function OptimizedHeroSection() {
  return (
    <>
      <Head>
        <title>Crypto x AI 学习平台 - 量化交易与人工智能专业教育</title>
        <meta name="description" content="专业的 Crypto x AI 学习平台，提供量化交易、AI Agent 开发和 Web3 技术的深度教育内容。摆脱信息茧房，掌握未来技术。" />
        <meta name="keywords" content="量化交易,AI Agent,Web3,区块链,加密货币,人工智能,学习平台" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 overflow-hidden">
        {/* 背景装饰元素 */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* 渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center min-h-screen py-20">
            
            {/* 主要内容区 */}
            <div className="text-center space-y-8">
              
              {/* 标签/徽章 */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                专业级 Crypto x AI 教育平台
              </div>
              
              {/* 主标题 */}
              <div className="space-y-4">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  掌握未来科技
                </h1>
                <h2 className="text-4xl font-bold max-w-4xl mx-auto">
                  量化交易 × AI Agent × Web3
                  <br />
                  <span className="text-gray-600">一站式专业学习平台</span>
                </h2>
              </div>
              
              {/* 副标题描述 */}
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                从零基础到专业实战，系统学习量化交易策略、AI Agent 开发和 Web3 技术。
                <br />
                摆脱信息茧房，与行业专家和同行者一起探索加密世界的无限可能。
              </p>
              
              {/* CTA 按钮组 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link href="/posts/2025-09-30-five-lessons" className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  开始学习之旅
                </Link>
                <button className="inline-flex items-center bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all shadow-md">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                  </svg>
                  查看学习路径
                </button>
              </div>
              
              {/* 信任指标 */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12 text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600 mr-2">1000+</span>
                  学员已开始学习
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600 mr-2">50+</span>
                  专业课程内容
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600 mr-2">95%</span>
                  学员满意度
                </div>
              </div>
              
            </div>
            
            {/* 特色卡片网格 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              
              {/* 量化交易卡片 */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 group">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">量化交易策略</h3>
                <p className="text-gray-600 leading-relaxed">
                  学习算法交易的核心原理，掌握风险管理和策略优化，利用 AI 技术提升投资决策效率。
                </p>
              </div>
              
              {/* AI Agent 卡片 */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 group">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Agent 开发</h3>
                <p className="text-gray-600 leading-relaxed">
                  构建智能代理系统，自动化复杂的业务流程，让 AI 成为你的得力助手和决策伙伴。
                </p>
              </div>
              
              {/* Web3 技术卡片 */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 group">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Web3 技术栈</h3>
                <p className="text-gray-600 leading-relaxed">
                  深入区块链技术原理，掌握智能合约开发，拥抱去中心化的未来互联网世界。
                </p>
              </div>
              
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}