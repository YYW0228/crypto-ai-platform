import React from 'react';
import Link from 'next/link';

/**
 * 学习路径卡片组件 - 基于 Odyssey DAO 用户引导设计
 * 特点：清晰的进度指示、吸引人的交互效果、完成状态反馈
 */

interface LearningPathCardProps {
  title: string;
  description: string;
  slug: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  tags: string[];
  isCompleted?: boolean;
  isLocked?: boolean;
  completionRate?: number;
}

export default function LearningPathCard({
  title,
  description,
  slug,
  difficulty,
  estimatedTime,
  tags,
  isCompleted = false,
  isLocked = false,
  completionRate = 0
}: LearningPathCardProps) {
  
  const difficultyConfig = {
    beginner: {
      color: 'text-green-600',
      bg: 'bg-green-100',
      label: '入门级'
    },
    intermediate: {
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      label: '进阶级'
    },
    advanced: {
      color: 'text-red-600',
      bg: 'bg-red-100',
      label: '专家级'
    }
  };

  const CardContent = () => (
    <div className={`
      card relative overflow-hidden
      ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
      ${isCompleted ? 'border-green-200 bg-green-50' : ''}
      group
    `}>
      
      {/* 进度条 */}
      {completionRate > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      )}
      
      {/* 完成状态指示器 */}
      {isCompleted && (
        <div className="absolute top-4 right-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
      
      {/* 锁定状态指示器 */}
      {isLocked && (
        <div className="absolute top-4 right-4">
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
      )}
      
      {/* 卡片主要内容 */}
      <div className="space-y-4">
        
        {/* 标题 */}
        <h3 className={`
          heading-sm group-hover:text-blue-600 transition-colors
          ${isCompleted ? 'text-green-700' : ''}
          ${isLocked ? 'text-gray-500' : ''}
        `}>
          {title}
        </h3>
        
        {/* 描述 */}
        <p className={`
          text-body text-gray-600 line-clamp-3
          ${isLocked ? 'text-gray-400' : ''}
        `}>
          {description}
        </p>
        
        {/* 元信息 */}
        <div className="flex items-center justify-between">
          
          {/* 难度标签 */}
          <div className="flex items-center space-x-2">
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${difficultyConfig[difficulty].bg}
              ${difficultyConfig[difficulty].color}
            `}>
              {difficultyConfig[difficulty].label}
            </span>
            
            {/* 预计时间 */}
            <span className="text-xs text-gray-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {estimatedTime}
            </span>
          </div>
          
        </div>
        
        {/* 标签 */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        {/* 行动按钮 */}
        <div className="pt-2">
          {isLocked ? (
            <button 
              disabled 
              className="w-full py-2 px-4 bg-gray-200 text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed"
            >
              🔒 需要完成前置课程
            </button>
          ) : isCompleted ? (
            <button className="w-full py-2 px-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
              ✅ 已完成 - 点击复习
            </button>
          ) : (
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors group-hover:scale-105 transform duration-200">
              {completionRate > 0 ? '继续学习' : '开始学习'}
              <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
        
      </div>
      
      {/* 悬停效果的装饰元素 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
    </div>
  );

  // 如果被锁定，不渲染为链接
  if (isLocked) {
    return <CardContent />;
  }

  // 正常情况下渲染为链接
  return (
    <Link href={`/posts/${slug}`}>
      <CardContent />
    </Link>
  );
}

/**
 * 学习路径网格组件
 */
interface LearningPathGridProps {
  courses: LearningPathCardProps[];
  title?: string;
  description?: string;
}

export function LearningPathGrid({ 
  courses, 
  title = "学习路径",
  description = "系统化的学习体验，从基础到进阶"
}: LearningPathGridProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h2 className="heading-lg text-gradient mb-4">{title}</h2>
          <p className="text-body-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        {/* 课程网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <LearningPathCard key={index} {...course} />
          ))}
        </div>
        
        {/* 底部 CTA */}
        <div className="text-center mt-12">
          <button className="btn-primary">
            查看完整学习路径
            <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
        
      </div>
    </section>
  );
}