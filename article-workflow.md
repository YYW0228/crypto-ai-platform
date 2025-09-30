# 📝 文章管理和自动发布工作流

## 🎯 推荐的文章管理结构

### 📁 目录结构设计
```
~/Documents/crypto-ai-articles/          # 主文章仓库
├── drafts/                              # 草稿文件夹
│   ├── 2024-10-01-新文章标题.md
│   └── 2024-10-02-另一篇文章.md
├── ready-to-publish/                    # 准备发布的文章
│   ├── 2024-09-30-量化交易策略.md
│   └── 2024-10-01-AI-Agent开发.md
├── published/                           # 已发布的文章备份
│   └── archive/
├── templates/                           # 文章模板
│   ├── basic-article-template.md
│   ├── tutorial-template.md
│   └── analysis-template.md
└── assets/                              # 文章资源
    ├── images/
    ├── diagrams/
    └── code-examples/
```

### 📋 标准文章格式
```markdown
---
title: 文章标题
date: 2024-10-01
category: 量化交易|AI开发|Web3技术|开发工具|套利交易
difficulty: beginner|intermediate|advanced
tags: [标签1, 标签2, 标签3]
estimatedTime: "30 分钟"
author: 你的名字
description: 一句话描述文章内容
cover: /images/article-cover.jpg
status: draft|ready|published
---

# 文章标题

## 概述
文章简介...

## 核心内容
详细内容...

## 实战案例
具体例子...

## 总结
要点总结...
```

## 🔄 自动发布工作流选项

### 选项 A：本地脚本 + Git 自动推送
使用我即将创建的脚本，一键将文章从 ready-to-publish 发布到网站。

### 选项 B：GitHub Actions 自动监控
设置 GitHub Actions 监控文章仓库，自动同步到网站仓库。

### 选项 C：Obsidian + Git 插件集成
如果你继续使用 Obsidian，可以配置 Git 插件自动同步。

## 🚀 推荐工作流程

1. **写作阶段**：在 `drafts/` 文件夹写作
2. **审核阶段**：完成后移至 `ready-to-publish/`
3. **发布阶段**：运行发布脚本自动推送
4. **归档阶段**：发布后移至 `published/archive/`

你希望我实现哪种方案？