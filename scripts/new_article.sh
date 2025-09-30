#!/bin/bash

# 📝 快速创建新文章
# 基于模板创建新文章草稿

ARTICLE_REPO="/Users/mac/Documents/crypto-ai-articles"

if [ -z "$1" ]; then
    echo "❌ 请提供文章标题"
    echo "用法: ./scripts/new_article.sh \"文章标题\" [模板类型]"
    echo "模板类型: basic (默认) | tutorial | analysis"
    exit 1
fi

TITLE="$1"
TEMPLATE_TYPE="${2:-basic}"
DATE=$(date +%Y-%m-%d)
SLUG=$(echo "$TITLE" | sed 's/[^a-zA-Z0-9\u4e00-\u9fff]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')
FILENAME="$DATE-$SLUG.md"

TEMPLATE_FILE="$ARTICLE_REPO/templates/$TEMPLATE_TYPE-article-template.md"
NEW_ARTICLE="$ARTICLE_REPO/drafts/$FILENAME"

if [ ! -f "$TEMPLATE_FILE" ]; then
    echo "❌ 模板文件不存在: $TEMPLATE_FILE"
    exit 1
fi

# 复制模板并替换标题和日期
cp "$TEMPLATE_FILE" "$NEW_ARTICLE"
sed -i "s/title: .*/title: $TITLE/" "$NEW_ARTICLE"
sed -i "s/date: .*/date: $DATE/" "$NEW_ARTICLE"

echo "✅ 新文章已创建: $NEW_ARTICLE"
echo "📝 开始编辑你的文章吧！"

# 如果安装了 VS Code，自动打开文件
if command -v code &> /dev/null; then
    code "$NEW_ARTICLE"
fi
