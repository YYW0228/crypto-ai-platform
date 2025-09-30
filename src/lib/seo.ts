// SEO 配置和工具函数

export const siteConfig = {
  name: 'Crypto × AI 学习平台',
  description: '专业的Crypto与AI结合学习平台，提供量化交易、AI Agent开发、Web3技术深度教程',
  url: 'https://yourdomain.com',
  ogImage: 'https://yourdomain.com/og-image.png',
  creator: '@cryptoai_platform',
  keywords: [
    'Crypto',
    'AI Agent',
    '量化交易',
    'Web3',
    '区块链',
    '人工智能',
    'DeFi',
    '加密货币投资',
    '智能合约',
    '去中心化'
  ]
};

export function generateMetaTags({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}) {
  const metaTags = [
    { name: 'description', content: description },
    { name: 'keywords', content: keywords?.join(', ') || siteConfig.keywords.join(', ') },
    { name: 'author', content: author || siteConfig.name },
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
    
    // Open Graph
    { property: 'og:type', content: type },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: siteConfig.name },
    { property: 'og:image', content: image || siteConfig.ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'zh_CN' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: siteConfig.creator },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image || siteConfig.ogImage },
  ];

  // 如果是文章类型，添加文章特定的标签
  if (type === 'article') {
    if (publishedTime) {
      metaTags.push({ property: 'article:published_time', content: publishedTime });
    }
    if (modifiedTime) {
      metaTags.push({ property: 'article:modified_time', content: modifiedTime });
    }
    if (author) {
      metaTags.push({ property: 'article:author', content: author });
    }
    if (tags) {
      tags.forEach(tag => {
        metaTags.push({ property: 'article:tag', content: tag });
      });
    }
  }

  return metaTags;
}

export function generateStructuredData({
  type,
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  keywords,
  image,
  category,
  wordCount,
  readingTime
}: {
  type: 'WebSite' | 'Article';
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  keywords?: string;
  image?: string;
  category?: string;
  wordCount?: number;
  readingTime?: string;
}) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description,
    url
  };

  if (type === 'WebSite') {
    return {
      ...baseData,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteConfig.url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
  }

  if (type === 'Article') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Person',
        name: author || siteConfig.name
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.name,
        logo: {
          '@type': 'ImageObject',
          url: `${siteConfig.url}/logo.png`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      },
      image: image || siteConfig.ogImage,
      keywords,
      articleSection: category,
      wordCount,
      timeRequired: readingTime
    };
  }

  return baseData;
}