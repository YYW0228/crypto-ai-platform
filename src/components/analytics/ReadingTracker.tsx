import { useEffect, useState } from 'react';
import * as gtag from '../../lib/gtag';

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
        gtag.event({
          action: 'article_read_halfway',
          category: 'Reading',
          label: slug,
          value: Math.round((Date.now() - startTime) / 1000)
        });
      }
      
      // 追踪阅读完成
      if (scrollPercent > 90 && !hasTrackedComplete) {
        setHasTrackedComplete(true);
        gtag.event({
          action: 'article_read_complete',
          category: 'Reading', 
          label: slug,
          value: Math.round((Date.now() - startTime) / 1000)
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug, startTime, hasTrackedHalfway, hasTrackedComplete]);

  return <>{children}</>;
}
