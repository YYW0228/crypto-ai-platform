#!/bin/bash

# 🚀 导入 Obsidian 文章到 crypto-ai-platform
# 自动将 Obsidian 笔记转换为项目文章格式

echo "📚 开始导入 Obsidian 文章..."

OBSIDIAN_PATH="/Users/mac/Downloads/obsidian"
CONTENT_PATH="./content/posts"

# 创建内容目录
mkdir -p "$CONTENT_PATH"

# 定义要导入的重点文章
declare -a ARTICLES=(
    "量化交易的应用.md"
    "Master Prompt构建本地化Crypto超级助理.md"
    "Crypto KOL 自媒体语音体系方案（Coqui + Bert-VITS2）.md"
    "去中心化鏈上交易所的高頻交易.md"
    "**如何开始套利赚钱四**.md"
    "交易所價差套利.md"
    "HuggingFace、Langchain和Transformers构建应用的进阶技巧.md"
    "LLaMA.cpp Qwen 模型快速启动函数 (llama-cli 版本).md"
    "NMACD   Martin  BFAlgo.md"
    "golang服务器交叉编译.md"
    "tmux最实用的5个技能，提升终端效率飞起！.md"
)

# 转换函数
convert_article() {
    local file="$1"
    local title="$2"
    local slug="$3"
    local category="$4"
    local difficulty="$5"
    
    if [ -f "$OBSIDIAN_PATH/$file" ]; then
        echo "   📄 转换: $file"
        
        # 创建带前置元数据的文章
        cat > "$CONTENT_PATH/$slug.md" << EOF
---
title: $title
date: $(date +%Y-%m-%d)
category: $category
difficulty: $difficulty
tags: [$(echo $category | tr ' ' ',')]
author: Crypto AI Platform
description: $title
---

EOF
        # 添加原文内容，过滤掉可能的 Obsidian 特殊标记
        sed 's/\[\[.*\]\]//g' "$OBSIDIAN_PATH/$file" | \
        sed 's/!!\[.*\]!!//g' | \
        sed 's/%%.*%%//g' >> "$CONTENT_PATH/$slug.md"
        
        echo "   ✅ 完成: $CONTENT_PATH/$slug.md"
    else
        echo "   ❌ 文件不存在: $file"
    fi
}

# 开始转换文章
echo "🔄 转换文章..."

convert_article "量化交易的应用.md" "量化交易核心应用与实战策略" "quantitative-trading-applications" "量化交易" "intermediate"

convert_article "Master Prompt构建本地化Crypto超级助理.md" "构建本地化 Crypto AI 超级助理" "crypto-ai-assistant-prompt" "AI Agent" "advanced"

convert_article "Crypto KOL 自媒体语音体系方案（Coqui + Bert-VITS2）.md" "Crypto KOL 语音合成技术方案" "crypto-kol-voice-synthesis" "AI技术" "advanced"

convert_article "去中心化鏈上交易所的高頻交易.md" "去中心化交易所高频交易策略" "dex-high-frequency-trading" "DeFi交易" "advanced"

convert_article "**如何开始套利赚钱四**.md" "加密货币套利入门指南" "crypto-arbitrage-guide" "套利交易" "beginner"

convert_article "交易所價差套利.md" "交易所价差套利实战" "exchange-arbitrage-practice" "套利交易" "intermediate"

convert_article "HuggingFace、Langchain和Transformers构建应用的进阶技巧.md" "AI 开发工具链进阶技巧" "ai-development-advanced-tools" "AI开发" "intermediate"

convert_article "LLaMA.cpp Qwen 模型快速启动函数 (llama-cli 版本).md" "本地 AI 模型快速部署指南" "local-ai-model-deployment" "AI部署" "intermediate"

convert_article "NMACD   Martin  BFAlgo.md" "NMACD 与马丁格尔策略解析" "nmacd-martin-strategy-analysis" "交易策略" "advanced"

convert_article "golang服务器交叉编译.md" "Go 服务器交叉编译实战" "golang-cross-compilation" "后端开发" "intermediate"

convert_article "tmux最实用的5个技能，提升终端效率飞起！.md" "Tmux 终端效率提升技巧" "tmux-productivity-tips" "开发工具" "beginner"

echo ""
echo "📊 导入统计:"
echo "   总共导入: $(ls -1 "$CONTENT_PATH" | wc -l) 篇文章"
echo "   存储位置: $CONTENT_PATH"

echo ""
echo "📋 下一步操作:"
echo "1. 检查导入的文章内容"
echo "2. 更新学习路径数据"
echo "3. 重新构建项目"
echo ""
echo "✅ Obsidian 文章导入完成！"