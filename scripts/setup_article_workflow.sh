#!/bin/bash

# 🚀 设置文章管理和自动发布工作流
# 创建完整的文章管理系统

echo "📝 设置 Crypto AI 平台文章管理工作流..."

# 设置文章仓库路径
ARTICLE_REPO="$HOME/Documents/crypto-ai-articles"
PROJECT_ROOT="$(pwd)"

echo "📁 创建文章管理目录结构..."

# 创建主要目录
mkdir -p "$ARTICLE_REPO"/{drafts,ready-to-publish,published/archive,templates,assets/{images,diagrams,code-examples}}

echo "✅ 文章目录创建完成: $ARTICLE_REPO"

# 创建文章模板
echo "📋 创建文章模板..."

# 基础文章模板
cat > "$ARTICLE_REPO/templates/basic-article-template.md" << 'EOF'
---
title: 文章标题
date: 2024-10-01
category: 量化交易|AI开发|Web3技术|开发工具|套利交易
difficulty: beginner|intermediate|advanced
tags: [标签1, 标签2, 标签3]
estimatedTime: "30 分钟"
author: Crypto AI Platform
description: 一句话描述文章内容（用于 SEO 和社交分享）
cover: /images/article-cover.jpg
status: draft
---

# 文章标题

## 🎯 概述

简要介绍文章要解决的问题和读者将获得的价值。

## 📚 背景知识

如果需要，介绍相关的背景概念。

## 🔧 核心内容

### 子标题 1

详细内容...

### 子标题 2

更多内容...

## 💡 实战案例

提供具体的代码示例或操作步骤：

```javascript
// 代码示例
const example = "Hello World";
```

## ⚠️ 注意事项

列出重要的注意点和风险提示。

## 🎯 总结

- 要点 1
- 要点 2
- 要点 3

## 📖 延伸阅读

- [相关文章链接](/)
- [参考资料](/)

---

**作者简介**: 简短的作者介绍
**发布时间**: {date}
**预计阅读**: {estimatedTime}
EOF

# 教程类文章模板
cat > "$ARTICLE_REPO/templates/tutorial-template.md" << 'EOF'
---
title: 教程标题
date: 2024-10-01
category: 教程分类
difficulty: beginner
tags: [教程, 实战, 步骤]
estimatedTime: "45 分钟"
author: Crypto AI Platform
description: 详细的步骤教程
cover: /images/tutorial-cover.jpg
status: draft
prerequisites: 
  - 前置知识1
  - 前置知识2
tools:
  - 工具1
  - 工具2
---

# 教程标题

## 🎯 你将学到什么

- 技能点1
- 技能点2
- 技能点3

## 📋 前置要求

- [ ] 前置知识1
- [ ] 前置知识2
- [ ] 安装的工具

## 🛠 所需工具

- 工具1 - 用途说明
- 工具2 - 用途说明

## 📖 步骤详解

### 步骤 1: 准备工作

详细说明...

### 步骤 2: 核心操作

详细说明...

### 步骤 3: 验证结果

详细说明...

## 🐛 常见问题

### 问题1: 描述
**解决方案**: 说明

### 问题2: 描述
**解决方案**: 说明

## 🎉 完成检查

- [ ] 检查项1
- [ ] 检查项2
- [ ] 检查项3

## 🚀 下一步

建议继续学习的内容...
EOF

# 分析类文章模板
cat > "$ARTICLE_REPO/templates/analysis-template.md" << 'EOF'
---
title: 分析报告标题
date: 2024-10-01
category: 市场分析|技术分析|项目分析
difficulty: intermediate
tags: [分析, 研究, 数据]
estimatedTime: "25 分钟"
author: Crypto AI Platform
description: 深度分析报告
cover: /images/analysis-cover.jpg
status: draft
dataSource: 数据来源
analysisDate: 2024-10-01
---

# 分析报告标题

## 📊 执行摘要

核心发现和结论的简要总结。

## 🔍 分析背景

说明分析的背景、目的和重要性。

## 📈 数据概览

### 关键指标

| 指标 | 数值 | 变化 |
|------|------|------|
| 指标1 | 100 | +10% |
| 指标2 | 200 | -5% |

### 数据来源

- 数据源1: 说明
- 数据源2: 说明

## 🔬 深度分析

### 趋势分析

详细的趋势分析...

### 影响因素

- 因素1: 影响说明
- 因素2: 影响说明

### 风险评估

识别的主要风险...

## 💡 关键洞察

1. 洞察点1
2. 洞察点2
3. 洞察点3

## 🎯 结论与建议

基于分析得出的结论和行动建议。

## ⚠️ 免责声明

本分析仅供参考，不构成投资建议。
EOF

echo "✅ 文章模板创建完成"

# 创建发布脚本
echo "🚀 创建自动发布脚本..."

cat > "$PROJECT_ROOT/scripts/publish_article.sh" << EOF
#!/bin/bash

# 📰 文章自动发布脚本
# 将准备好的文章发布到 crypto-ai-platform

ARTICLE_REPO="$ARTICLE_REPO"
PROJECT_ROOT="$PROJECT_ROOT"
READY_DIR="\$ARTICLE_REPO/ready-to-publish"
PUBLISHED_DIR="\$ARTICLE_REPO/published/archive"
CONTENT_DIR="\$PROJECT_ROOT/content/posts"

echo "🚀 开始发布文章..."

# 检查是否有待发布的文章
if [ ! -d "\$READY_DIR" ] || [ -z "\$(ls -A "\$READY_DIR" 2>/dev/null)" ]; then
    echo "❌ 没有找到待发布的文章在: \$READY_DIR"
    exit 1
fi

# 发布所有准备好的文章
for article in "\$READY_DIR"/*.md; do
    if [ -f "\$article" ]; then
        filename=\$(basename "\$article")
        echo "📄 发布文章: \$filename"
        
        # 复制到项目内容目录
        cp "\$article" "\$CONTENT_DIR/"
        
        # 移动到已发布存档
        mv "\$article" "\$PUBLISHED_DIR/"
        
        echo "✅ 已发布: \$filename"
    fi
done

# 更新学习路径数据
echo "🔄 更新学习路径数据..."
# 这里可以添加自动更新学习路径的逻辑

# Git 提交和推送
echo "📤 推送到 GitHub..."
cd "\$PROJECT_ROOT"
git add .
git commit -m "📝 发布新文章: \$(date +%Y-%m-%d)"
git push

echo "🎉 文章发布完成！"
echo "🌐 网站将在 2-3 分钟内自动更新"
EOF

chmod +x "$PROJECT_ROOT/scripts/publish_article.sh"

# 创建新文章快速创建脚本
cat > "$PROJECT_ROOT/scripts/new_article.sh" << EOF
#!/bin/bash

# 📝 快速创建新文章
# 基于模板创建新文章草稿

ARTICLE_REPO="$ARTICLE_REPO"

if [ -z "\$1" ]; then
    echo "❌ 请提供文章标题"
    echo "用法: ./scripts/new_article.sh \"文章标题\" [模板类型]"
    echo "模板类型: basic (默认) | tutorial | analysis"
    exit 1
fi

TITLE="\$1"
TEMPLATE_TYPE="\${2:-basic}"
DATE=\$(date +%Y-%m-%d)
SLUG=\$(echo "\$TITLE" | sed 's/[^a-zA-Z0-9\u4e00-\u9fff]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-\$//g')
FILENAME="\$DATE-\$SLUG.md"

TEMPLATE_FILE="\$ARTICLE_REPO/templates/\$TEMPLATE_TYPE-article-template.md"
NEW_ARTICLE="\$ARTICLE_REPO/drafts/\$FILENAME"

if [ ! -f "\$TEMPLATE_FILE" ]; then
    echo "❌ 模板文件不存在: \$TEMPLATE_FILE"
    exit 1
fi

# 复制模板并替换标题和日期
cp "\$TEMPLATE_FILE" "\$NEW_ARTICLE"
sed -i "s/title: .*/title: \$TITLE/" "\$NEW_ARTICLE"
sed -i "s/date: .*/date: \$DATE/" "\$NEW_ARTICLE"

echo "✅ 新文章已创建: \$NEW_ARTICLE"
echo "📝 开始编辑你的文章吧！"

# 如果安装了 VS Code，自动打开文件
if command -v code &> /dev/null; then
    code "\$NEW_ARTICLE"
fi
EOF

chmod +x "$PROJECT_ROOT/scripts/new_article.sh"

# 创建状态检查脚本
cat > "$PROJECT_ROOT/scripts/article_status.sh" << EOF
#!/bin/bash

# 📊 文章状态检查
# 显示文章管理仓库的当前状态

ARTICLE_REPO="$ARTICLE_REPO"

echo "📊 === Crypto AI 平台文章状态 ==="
echo ""

echo "📝 草稿文章:"
if [ -d "\$ARTICLE_REPO/drafts" ]; then
    ls -la "\$ARTICLE_REPO/drafts"/*.md 2>/dev/null | wc -l | xargs echo "   总数:"
    ls "\$ARTICLE_REPO/drafts"/*.md 2>/dev/null | sed 's|.*/||' | sed 's|^|   - |'
else
    echo "   无草稿文章"
fi

echo ""
echo "🚀 待发布文章:"
if [ -d "\$ARTICLE_REPO/ready-to-publish" ]; then
    ls -la "\$ARTICLE_REPO/ready-to-publish"/*.md 2>/dev/null | wc -l | xargs echo "   总数:"
    ls "\$ARTICLE_REPO/ready-to-publish"/*.md 2>/dev/null | sed 's|.*/||' | sed 's|^|   - |'
else
    echo "   无待发布文章"
fi

echo ""
echo "✅ 已发布文章:"
if [ -d "\$ARTICLE_REPO/published/archive" ]; then
    ls -la "\$ARTICLE_REPO/published/archive"/*.md 2>/dev/null | wc -l | xargs echo "   总数:"
    ls "\$ARTICLE_REPO/published/archive"/*.md 2>/dev/null | sed 's|.*/||' | sed 's|^|   - |'
else
    echo "   无已发布文章"
fi

echo ""
echo "💡 快速命令:"
echo "   新建文章: ./scripts/new_article.sh \"标题\""
echo "   发布文章: ./scripts/publish_article.sh"
echo "   查看状态: ./scripts/article_status.sh"
EOF

chmod +x "$PROJECT_ROOT/scripts/article_status.sh"

echo ""
echo "🎉 文章管理工作流设置完成！"
echo ""
echo "📁 文章仓库位置: $ARTICLE_REPO"
echo ""
echo "🚀 快速开始:"
echo "1. 创建新文章:"
echo "   ./scripts/new_article.sh \"我的第一篇文章\""
echo ""
echo "2. 编辑完成后，移动到 ready-to-publish 文件夹"
echo ""
echo "3. 发布文章:"
echo "   ./scripts/publish_article.sh"
echo ""
echo "4. 查看状态:"
echo "   ./scripts/article_status.sh"
echo ""
echo "📋 工作流程:"
echo "   草稿 → 准备发布 → 自动发布到网站 → 归档"