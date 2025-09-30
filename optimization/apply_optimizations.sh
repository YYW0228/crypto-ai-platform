#!/bin/bash

# 🚀 应用所有优化到 crypto-ai-platform
# 这个脚本会将生成的优化代码集成到项目中

echo "🎯 开始应用网站优化..."
echo ""

# 1. 备份现有文件
echo "📋 Step 1: 备份现有文件..."
mkdir -p ./optimization/backups
cp -r ./src ./optimization/backups/src_backup_$(date +%Y%m%d_%H%M%S)
echo "✅ 备份完成"

# 2. 集成优化样式到全局 CSS
echo "📋 Step 2: 集成优化样式..."
cat ./optimization/generated_code/styles/professional_theme.css >> ./src/styles/globals.css
cat ./optimization/generated_code/styles/optimized_article.css >> ./src/styles/globals.css
echo "✅ 样式集成完成"

# 3. 创建示例数据
echo "📋 Step 3: 创建学习路径示例数据..."
cat > ./src/data/learning_paths.ts << 'EOF'
export const learningPaths = [
  {
    title: "五条投资与 AI 学习心得",
    description: "从投资纪律到 AI Agent 开发，5个核心心得帮你建立正确的学习和投资理念。",
    slug: "2025-09-30-five-lessons",
    difficulty: "beginner" as const,
    estimatedTime: "15 分钟",
    tags: ["投资心得", "AI学习", "入门指南"],
    isCompleted: false,
    completionRate: 0
  },
  {
    title: "量化交易基础：从零开始",
    description: "学习量化交易的基础概念、策略类型和风险管理，为算法交易打下坚实基础。",
    slug: "quantitative-trading-basics",
    difficulty: "beginner" as const,
    estimatedTime: "30 分钟",
    tags: ["量化交易", "基础知识", "策略"],
    isCompleted: false,
    isLocked: true,
    completionRate: 0
  },
  {
    title: "AI Agent 开发实战",
    description: "构建你的第一个 AI Agent，从设计到部署，掌握智能代理的核心技术。",
    slug: "ai-agent-development",
    difficulty: "intermediate" as const,
    estimatedTime: "45 分钟",
    tags: ["AI Agent", "开发实战", "智能代理"],
    isCompleted: false,
    isLocked: true,
    completionRate: 0
  },
  {
    title: "Web3 技术栈深度解析",
    description: "深入了解区块链技术、智能合约和 DeFi 协议，掌握 Web3 开发核心技能。",
    slug: "web3-tech-stack",
    difficulty: "advanced" as const,
    estimatedTime: "60 分钟",
    tags: ["Web3", "区块链", "智能合约"],
    isCompleted: false,
    isLocked: true,
    completionRate: 0
  },
  {
    title: "DeFi 协议安全分析",
    description: "学习 DeFi 协议的安全审计方法，理解常见漏洞和防护措施。",
    slug: "defi-security-analysis",
    difficulty: "advanced" as const,
    estimatedTime: "90 分钟",
    tags: ["DeFi", "安全审计", "漏洞分析"],
    isCompleted: false,
    isLocked: true,
    completionRate: 0
  },
  {
    title: "加密货币投资组合优化",
    description: "运用现代投资组合理论，构建风险可控的加密货币投资策略。",
    slug: "crypto-portfolio-optimization",
    difficulty: "intermediate" as const,
    estimatedTime: "40 分钟",
    tags: ["投资组合", "风险管理", "策略优化"],
    isCompleted: false,
    isLocked: true,
    completionRate: 0
  }
];
EOF

echo "✅ 示例数据创建完成"

# 4. 创建优化后的首页
echo "📋 Step 4: 创建优化后的首页..."
cat > ./src/pages/index_optimized.tsx << 'EOF'
import OptimizedHeroSection from '../components/OptimizedHeroSection';
import { LearningPathGrid } from '../components/LearningPathCard';
import { learningPaths } from '../data/learning_paths';

export default function OptimizedHome() {
  return (
    <>
      <OptimizedHeroSection />
      <LearningPathGrid 
        courses={learningPaths}
        title="系统化学习路径"
        description="从基础到进阶，跟随专业课程体系掌握 Crypto x AI 核心技能"
      />
    </>
  );
}
EOF

echo "✅ 优化首页创建完成"

# 5. 创建优化后的文章页面
echo "📋 Step 5: 创建优化后的文章页面..."
cat > ./src/pages/posts/[slug]_optimized.tsx << 'EOF'
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';

export default function OptimizedPost({ content, frontMatter }: { content: string; frontMatter: any }) {
  return (
    <>
      <Head>
        <title>{`${frontMatter.title} | Crypto x AI 学习平台`}</title>
        <meta name="description" content={frontMatter.title} />
      </Head>
      <Layout>
        <div className="article-container">
          <article className="py-12">
            <div className="article-header">
              <h1 className="article-title">{frontMatter.title}</h1>
              <div className="article-meta">{frontMatter.date}</div>
            </div>
            <div className="article-content">
              <ReactMarkdown 
                components={{
                  ol: ({children}) => <ol className="list-decimal list-inside space-y-3 text-gray-700">{children}</ol>,
                  ul: ({children}) => <ul className="list-disc list-inside space-y-3 text-gray-700">{children}</ul>,
                  li: ({children}) => <li className="leading-relaxed">{children}</li>
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), 'content/posts');
  const filenames = fs.readdirSync(postsDir);
  const paths = filenames.map((name) => ({
    params: { slug: name.replace(/\.md$/, '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'content/posts', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  const serializedData = {
    ...data,
    date: data.date ? new Date(data.date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : data.date
  };
  
  return { props: { content, frontMatter: serializedData } };
}
EOF

echo "✅ 优化文章页面创建完成"

# 6. 复制优化组件到项目
echo "📋 Step 6: 复制优化组件..."
cp ./optimization/generated_code/components/OptimizedHeroSection.tsx ./src/components/
cp ./optimization/generated_code/components/LearningPathCard.tsx ./src/components/
echo "✅ 组件复制完成"

# 7. 创建数据目录
mkdir -p ./src/data
cp ./src/data/learning_paths.ts ./src/data/ 2>/dev/null || echo "数据文件已存在"

echo ""
echo "🎉 优化应用完成！"
echo ""
echo "📋 已完成的优化："
echo "✅ 专业配色方案 (基于 Chainlink)"
echo "✅ 优化字体系统 (基于 a16z crypto)"
echo "✅ 新 Hero Section 组件"
echo "✅ 学习路径卡片组件 (基于 Odyssey DAO)"
echo "✅ 优化的文章阅读体验"
echo "✅ 响应式设计改进"
echo ""
echo "🚀 查看优化效果："
echo "1. 测试优化首页："
echo "   mv src/pages/index.tsx src/pages/index_old.tsx"
echo "   mv src/pages/index_optimized.tsx src/pages/index.tsx"
echo ""
echo "2. 测试优化文章页："
echo "   mv src/pages/posts/[slug].tsx src/pages/posts/[slug]_old.tsx"
echo "   mv src/pages/posts/[slug]_optimized.tsx src/pages/posts/[slug].tsx"
echo ""
echo "3. 构建并查看效果："
echo "   npm run build"
echo "   npm run dev"
echo ""
echo "🎯 如需回滚，所有备份文件都在 ./optimization/backups/ 目录中"