// Google Analytics 4 配置
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// 页面浏览追踪
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// 事件追踪
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// 学习平台特定事件
export const trackLearningEvent = (eventName, articleSlug, progress = null) => {
  event({
    action: eventName,
    category: 'Learning',
    label: articleSlug,
    value: progress,
  });
};

// 文章阅读追踪
export const trackArticleRead = (slug, readTime) => {
  event({
    action: 'article_read',
    category: 'Content',
    label: slug,
    value: readTime,
  });
};

// 学习路径追踪
export const trackLearningPathStart = (pathName) => {
  event({
    action: 'learning_path_start',
    category: 'Learning Path',
    label: pathName,
  });
};

// CTA 按钮点击追踪
export const trackCTAClick = (buttonName, location) => {
  event({
    action: 'cta_click',
    category: 'CTA',
    label: `${buttonName}_${location}`,
  });
};
