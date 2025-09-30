#!/bin/bash

# 🔧 设置 Google Analytics 4 集成
# 为 crypto-ai-platform 配置完整的分析追踪

echo "📊 设置 Google Analytics 4 集成..."

# 1. 创建环境变量配置文件
echo "📋 Step 1: 创建环境变量配置..."
cat > .env.local.example << 'EOF'
# Google Analytics 4 配置
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# 其他分析工具（可选）
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token
EOF

# 2. 更新 gtag.js 工具函数
echo "📋 Step 2: 优化 Google Analytics 工具函数..."
cat > src/lib/gtag.js << 'EOF'
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
EOF

# 3. 创建增强的 _app.tsx
echo "📋 Step 3: 更新 _app.tsx 以支持完整追踪..."
cat > src/pages/_app.tsx << 'EOF'
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import * as gtag from '../lib/gtag';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Analytics 4 */}
      {gtag.GA_MEASUREMENT_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true,
                  allow_google_signals: false,
                  allow_ad_personalization_signals: false
                });
              `,
            }}
          />
        </>
      )}
      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
EOF

# 4. 创建分析追踪组件
echo "📋 Step 4: 创建文章阅读时间追踪组件..."
mkdir -p src/components/analytics
cat > src/components/analytics/ReadingTracker.tsx << 'EOF'
import { useEffect, useState } from 'react';
import { trackArticleRead } from '../../lib/gtag';

interface ReadingTrackerProps {
  slug: string;
  children: React.ReactNode;
}

export default function ReadingTracker({ slug, children }: ReadingTrackerProps) {
  const [startTime] = useState(Date.now());
  const [hasTrackedHalfway, setHasTrackedHalfway] = useState(false);
  const [hasTrackedComplete, setHasTrackedComplete] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      // 追踪阅读到一半
      if (scrollPercent > 50 && !hasTrackedHalfway) {
        setHasTrackedHalfway(true);
        trackArticleRead(`${slug}_halfway`, Math.round((Date.now() - startTime) / 1000));
      }
      
      // 追踪阅读完成
      if (scrollPercent > 90 && !hasTrackedComplete) {
        setHasTrackedComplete(true);
        trackArticleRead(`${slug}_complete`, Math.round((Date.now() - startTime) / 1000));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug, startTime, hasTrackedHalfway, hasTrackedComplete]);

  return <>{children}</>;
}
EOF

# 5. 创建 CTA 追踪组件
echo "📋 Step 5: 创建 CTA 按钮追踪组件..."
cat > src/components/analytics/TrackedButton.tsx << 'EOF'
import { trackCTAClick } from '../../lib/gtag';

interface TrackedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  buttonName: string;
  location: string;
  className?: string;
  [key: string]: any;
}

export default function TrackedButton({ 
  children, 
  onClick, 
  href, 
  buttonName, 
  location, 
  className = '',
  ...props 
}: TrackedButtonProps) {
  const handleClick = () => {
    trackCTAClick(buttonName, location);
    if (onClick) onClick();
  };

  if (href) {
    return (
      <a 
        href={href} 
        onClick={handleClick} 
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      onClick={handleClick} 
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
EOF

echo ""
echo "✅ Google Analytics 4 集成完成！"
echo ""
echo "📋 配置说明："
echo "1. 获取 GA4 测量 ID："
echo "   - 访问 https://analytics.google.com"
echo "   - 创建新的 GA4 属性"
echo "   - 复制测量 ID (格式: G-XXXXXXXXXX)"
echo ""
echo "2. 在 Cloudflare Pages 中设置环境变量："
echo "   - 变量名: NEXT_PUBLIC_GA_MEASUREMENT_ID"
echo "   - 变量值: 你的 GA4 测量 ID"
echo ""
echo "3. 追踪功能："
echo "   ✅ 页面浏览量"
echo "   ✅ 文章阅读进度"
echo "   ✅ CTA 按钮点击"
echo "   ✅ 学习路径追踪"
echo "   ✅ 用户行为分析"
echo ""
echo "🎯 分析数据将帮助你优化学习平台！"