import * as gtag from '../lib/gtag';

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

// 参考CoinTelegraph、Decrypt等网站的分享组件
export const ShareButtons = ({ title, url, description }: ShareButtonsProps) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedDescription = encodeURIComponent(description || title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=CryptoAIPlatform`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    weibo: `https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}`,
    wechat: `#`, // 微信分享需要特殊处理
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
  };

  const handleShare = (platform: string, shareUrl: string) => {
    gtag.event({
      action: 'share',
      category: 'Social Engagement',
      label: `${platform} - ${title}`,
      value: 1
    });
    
    if (platform === 'wechat') {
      // 微信分享：复制链接到剪贴板
      navigator.clipboard.writeText(url).then(() => {
        alert('链接已复制到剪贴板，请在微信中粘贴分享');
      });
      return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      gtag.event({
        action: 'share',
        category: 'Social Engagement', 
        label: `copy_link - ${title}`,
        value: 1
      });
      alert('链接已复制到剪贴板！');
    });
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600 font-medium">分享：</span>
      
      {/* Twitter */}
      <button
        onClick={() => handleShare('twitter', shareLinks.twitter)}
        className="flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
        title="分享到Twitter"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </button>

      {/* Telegram */}
      <button
        onClick={() => handleShare('telegram', shareLinks.telegram)}
        className="flex items-center justify-center w-8 h-8 bg-blue-400 hover:bg-blue-500 text-white rounded-full transition-colors"
        title="分享到Telegram"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      </button>

      {/* 微博 */}
      <button
        onClick={() => handleShare('weibo', shareLinks.weibo)}
        className="flex items-center justify-center w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
        title="分享到微博"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zm8.95-4.774c-.339-.247-.57-.417-.47-.757.22-.752.243-1.4.063-1.981-.318-1.027-1.365-1.582-2.928-1.595.062-.17.11-.353.138-.55.184-1.318-.243-2.467-1.227-3.04-.717-.42-1.625-.512-2.447-.271-.366.108-.533.168-.526-.045.03-.886-.145-1.74-.688-2.418-.968-1.215-2.71-1.56-4.375-1.17-2.28.534-4.491 2.005-5.95 4.026-.972 1.347-1.457 2.78-1.457 4.182 0 3.644 4.312 6.497 9.635 6.497 5.355 0 9.726-2.854 9.726-6.37 0-1.043-.436-2.029-1.225-2.887l-.269-.02z"/>
        </svg>
      </button>

      {/* 微信 */}
      <button
        onClick={() => handleShare('wechat', shareLinks.wechat)}
        className="flex items-center justify-center w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
        title="分享到微信"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.298c-.115.379.226.747.619.644l1.904-.503c.2-.053.415-.02.595.091-1.057.608-2.383.975-3.83.975-.639 0-1.269-.069-1.887-.202l-2.099.553c-.394.104-.734-.265-.619-.644l.39-1.298a.59.59 0 0 0-.213-.665C.751 14.711-.37 12.788-.37 10.636c0-4.498 4.168-8.137 9.315-8.137.639 0 1.269.069 1.887.202.173-.031.36-.031.544 0 .618-.133 1.248-.202 1.887-.202 5.147 0 9.315 3.639 9.315 8.137 0 2.152-1.121 4.075-2.928 5.321a.59.59 0 0 0-.213.665l.39 1.298c.115.379-.226.747-.619.644l-2.099-.553c-.618.133-1.248.202-1.887.202-1.447 0-2.773-.367-3.83-.975.18-.111.395-.144.595-.091l1.904.503c.394.103.734-.265.619-.644l-.39-1.298a.59.59 0 0 1 .213-.665c1.832-1.347 3.002-3.338 3.002-5.55 0-4.054-3.891-7.342-8.691-7.342z"/>
        </svg>
      </button>

      {/* 复制链接 */}
      <button
        onClick={copyToClipboard}
        className="flex items-center justify-center w-8 h-8 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-colors"
        title="复制链接"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
};

// 浮动分享按钮（类似Medium样式）
export const FloatingShareButtons = ({ title, url }: { title: string; url: string }) => {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="bg-white shadow-lg rounded-full p-2 space-y-2">
        <ShareButtons title={title} url={url} />
      </div>
    </div>
  );
};