import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

// 增强的Analytics组件，参考CoinDesk、CoinTelegraph等顶级网站
export const Analytics = () => {
  const router = useRouter();

  useEffect(() => {
    if (!gtag.GA_MEASUREMENT_ID) return;

    const handleRouteChange = (url: string) => {
      // 页面浏览事件
      gtag.pageview(url);
      
      // 自定义事件：页面类型分析
      const pageType = getPageType(url);
      gtag.event({
        action: 'page_view_by_type',
        category: 'Navigation',
        label: pageType,
        value: 1
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return null;
};

// 页面类型分类（参考顶级加密货币网站）
function getPageType(url: string): string {
  if (url === '/') return 'homepage';
  if (url.startsWith('/posts/')) return 'article';
  if (url.includes('tutorial')) return 'tutorial';
  if (url.includes('trading')) return 'trading_content';
  if (url.includes('ai-agents')) return 'ai_content';
  if (url.includes('crypto')) return 'crypto_content';
  return 'other';
}

// 文章阅读追踪组件
export const ArticleReadingTracker = ({ articleTitle, category }: { articleTitle: string; category: string }) => {
  useEffect(() => {
    if (!gtag.GA_MEASUREMENT_ID) return;

    let startTime = Date.now();
    let maxScroll = 0;
    let milestones = new Set();

    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      maxScroll = Math.max(maxScroll, scrollPercent);

      // 追踪阅读里程碑
      [25, 50, 75, 90].forEach(milestone => {
        if (scrollPercent >= milestone && !milestones.has(milestone)) {
          milestones.add(milestone);
          gtag.event({
            action: 'scroll_depth',
            category: 'Article Engagement',
            label: `${articleTitle} - ${milestone}%`,
            value: milestone
          });
        }
      });
    };

    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      
      if (timeSpent > 30) { // 超过30秒认为是有效阅读
        gtag.event({
          action: 'engaged_reading',
          category: 'Article Engagement',
          label: articleTitle,
          value: timeSpent
        });
      }
    };

    window.addEventListener('scroll', trackScrollDepth);
    window.addEventListener('beforeunload', trackTimeOnPage);

    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      window.removeEventListener('beforeunload', trackTimeOnPage);
    };
  }, [articleTitle, category]);

  return null;
};

// CTA点击追踪
export const trackCTAClick = (ctaName: string, location: string) => {
  gtag.event({
    action: 'cta_click',
    category: 'User Engagement',
    label: `${ctaName} - ${location}`,
    value: 1
  });
};

// 文章分享追踪
export const trackShare = (platform: string, articleTitle: string) => {
  gtag.event({
    action: 'share',
    category: 'Social Engagement',
    label: `${platform} - ${articleTitle}`,
    value: 1
  });
};

// 搜索追踪
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  gtag.event({
    action: 'search',
    category: 'User Behavior',
    label: searchTerm,
    value: resultsCount
  });
};