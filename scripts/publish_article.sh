#!/bin/bash

# 📰 文章自动发布脚本
# 将准备好的文章发布到 crypto-ai-platform

ARTICLE_REPO="/Users/mac/Documents/crypto-ai-articles"
PROJECT_ROOT="/Users/mac/Downloads/google_ads_analyzer/crypto-ai-demo"
READY_DIR="$ARTICLE_REPO/ready-to-publish"
PUBLISHED_DIR="$ARTICLE_REPO/published/archive"
CONTENT_DIR="$PROJECT_ROOT/content/posts"

echo "🚀 开始发布文章..."

# 检查是否有待发布的文章
if [ ! -d "$READY_DIR" ] || [ -z "$(ls -A "$READY_DIR" 2>/dev/null)" ]; then
    echo "❌ 没有找到待发布的文章在: $READY_DIR"
    exit 1
fi

# 发布所有准备好的文章
for article in "$READY_DIR"/*.md; do
    if [ -f "$article" ]; then
        filename=$(basename "$article")
        echo "📄 发布文章: $filename"
        
        # 复制到项目内容目录
        cp "$article" "$CONTENT_DIR/"
        
        # 移动到已发布存档
        mv "$article" "$PUBLISHED_DIR/"
        
        echo "✅ 已发布: $filename"
    fi
done

# 更新学习路径数据
echo "🔄 更新学习路径数据..."
# 这里可以添加自动更新学习路径的逻辑

# Git 提交和推送
echo "📤 推送到 GitHub..."
cd "$PROJECT_ROOT"
git add .
git commit -m "📝 发布新文章: $(date +%Y-%m-%d)"
git push

echo "🎉 文章发布完成！"
echo "🌐 网站将在 2-3 分钟内自动更新"
