import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import { ArticleReadingTracker } from '../../components/Analytics';
import { ShareButtons } from '../../components/ShareButtons';
import { InlineNewsletter } from '../../components/Newsletter';
import { PriceWidget } from '../../components/PriceWidget';

export default function Post({ content, frontMatter }: { content: string; frontMatter: any }) {
  const router = useRouter();
  const canonicalUrl = `https://yourdomain.com${router.asPath}`;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : canonicalUrl;
  
  // 生成结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": frontMatter.title,
    "description": frontMatter.description || frontMatter.title,
    "datePublished": frontMatter.date,
    "dateModified": frontMatter.date,
    "author": {
      "@type": "Person",
      "name": frontMatter.author || "Crypto × AI 学习平台"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Crypto × AI 学习平台",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourdomain.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "keywords": frontMatter.keywords || frontMatter.tags?.join(', '),
    "articleSection": frontMatter.category || "教程",
    "wordCount": content.length,
    "timeRequired": frontMatter.readingTime || "5分钟"
  };

  return (
    <>
      <Head>
        <title>{`${frontMatter.title} | Crypto x AI 学习平台`}</title>
        <meta name="description" content={frontMatter.description || frontMatter.title} />
        <meta name="keywords" content={frontMatter.keywords || frontMatter.tags?.join(', ')} />
        <meta name="author" content={frontMatter.author || "Crypto × AI 学习平台"} />
        
        {/* Open Graph 标签 */}
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.description || frontMatter.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Crypto × AI 学习平台" />
        <meta property="article:published_time" content={frontMatter.date} />
        <meta property="article:author" content={frontMatter.author || "Crypto × AI 学习平台"} />
        {frontMatter.tags && frontMatter.tags.map((tag: string) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card 标签 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontMatter.title} />
        <meta name="twitter:description" content={frontMatter.description || frontMatter.title} />
        
        {/* 其他 SEO 标签 */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Layout>
        {/* 文章阅读追踪 */}
        <ArticleReadingTracker 
          articleTitle={frontMatter.title} 
          category={frontMatter.category || 'general'} 
        />
        
        <div className="flex gap-8 max-w-7xl mx-auto py-8">
          {/* 主要内容区域 */}
          <article className="flex-1 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{frontMatter.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <time dateTime={frontMatter.date} className="text-lg">
                📅 {frontMatter.date}
              </time>
              {frontMatter.author && (
                <span className="text-lg">👤 {frontMatter.author}</span>
              )}
              {frontMatter.readingTime && (
                <span className="text-lg">⏱️ {frontMatter.readingTime}</span>
              )}
              {frontMatter.difficulty && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {frontMatter.difficulty}
                </span>
              )}
            </div>
            {frontMatter.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {frontMatter.tags.map((tag: string) => (
                  <span 
                    key={tag} 
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            {frontMatter.description && (
              <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
                {frontMatter.description}
              </p>
            )}
          </header>
          
          {/* 分享按钮 */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <ShareButtons 
              title={frontMatter.title}
              url={currentUrl}
              description={frontMatter.description}
            />
          </div>
          
          <div className="prose prose-lg prose-blue max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          
          {/* 文章底部Newsletter */}
          <div className="mt-12 mb-8">
            <InlineNewsletter />
          </div>
          
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                📚 继续学习
              </h3>
              <p className="text-gray-600 mb-4">
                想了解更多 AI Agents 与 Web3 结合的内容？
              </p>
              <div className="flex gap-3">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                  订阅更新
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors">
                  分享文章
                </button>
              </div>
            </div>
          </footer>
          </article>
          
          {/* 侧边栏 */}
          <aside className="w-80 flex-shrink-0 hidden lg:block">
            <div className="sticky top-8 space-y-6">
              <PriceWidget />
              
              {/* 相关文章推荐 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📚</span>
                  推荐阅读
                </h3>
                <div className="space-y-3">
                  <a href="/posts/crypto-ai-agents-tutorial" className="block group">
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                      AI Agents教程：Web3投资效率提升
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">基础教程</p>
                  </a>
                  <a href="/posts/investment-reflexivity-theory" className="block group">
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                      投资的反身性：索罗斯理论应用
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">投资哲学</p>
                  </a>
                  <a href="/posts/arbitrage-time-difference-analysis" className="block group">
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                      时间差套利：FPGA硬件加速
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">专家级</p>
                  </a>
                </div>
              </div>
            </div>
          </aside>
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
  
  // 确保日期是字符串格式，以避免序列化错误
  const serializedData = {
    ...data,
    date: data.date ? data.date.toString() : data.date
  };
  
  return { props: { content, frontMatter: serializedData } };
}
