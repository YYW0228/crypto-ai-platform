#!/bin/bash

# 📊 文章状态检查
# 显示文章管理仓库的当前状态

ARTICLE_REPO="/Users/mac/Documents/crypto-ai-articles"

echo "📊 === Crypto AI 平台文章状态 ==="
echo ""

echo "📝 草稿文章:"
if [ -d "$ARTICLE_REPO/drafts" ]; then
    ls -la "$ARTICLE_REPO/drafts"/*.md 2>/dev/null | wc -l | xargs echo "   总数:"
    ls "$ARTICLE_REPO/drafts"/*.md 2>/dev/null | sed 's|.*/||' | sed 's|^|   - |'
else
    echo "   无草稿文章"
fi

echo ""
echo "🚀 待发布文章:"
if [ -d "$ARTICLE_REPO/ready-to-publish" ]; then
    ls -la "$ARTICLE_REPO/ready-to-publish"/*.md 2>/dev/null | wc -l | xargs echo "   总数:"
    ls "$ARTICLE_REPO/ready-to-publish"/*.md 2>/dev/null | sed 's|.*/||' | sed 's|^|   - |'
else
    echo "   无待发布文章"
fi

echo ""
echo "✅ 已发布文章:"
if [ -d "$ARTICLE_REPO/published/archive" ]; then
    ls -la "$ARTICLE_REPO/published/archive"/*.md 2>/dev/null | wc -l | xargs echo "   总数:"
    ls "$ARTICLE_REPO/published/archive"/*.md 2>/dev/null | sed 's|.*/||' | sed 's|^|   - |'
else
    echo "   无已发布文章"
fi

echo ""
echo "💡 快速命令:"
echo "   新建文章: ./scripts/new_article.sh \"标题\""
echo "   发布文章: ./scripts/publish_article.sh"
echo "   查看状态: ./scripts/article_status.sh"
