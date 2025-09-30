# Crypto x AI 学习平台

一个基于 Next.js + TailwindCSS 的现代化学习平台，专注于量化交易、AI Agent 开发和 Web3 技术。

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📁 项目结构

```
├── content/posts/           # Markdown 文章
├── src/
│   ├── pages/               # Next.js 页面
│   ├── components/          # React 组件
│   ├── lib/                 # 工具函数
│   └── styles/              # 样式文件
├── public/                  # 静态资源
└── .github/workflows/       # CI/CD 配置
```

## 🛠 技术栈

- **框架**: Next.js 13.5
- **样式**: TailwindCSS
- **语言**: TypeScript
- **分析**: Google Analytics 4
- **部署**: Cloudflare Pages

## 🔧 部署配置

1. 在 GitHub 项目的 Settings > Secrets 中添加以下环境变量：
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API Token
   - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Google Analytics 测量 ID

2. 推送代码到 main 分支即可自动部署到 Cloudflare Pages

## 📈 Google Analytics

项目已集成 GA4，只需在环境变量中设置 `NEXT_PUBLIC_GA_MEASUREMENT_ID` 即可开始追踪用户行为。

## 📝 添加文章

在 `content/posts/` 目录下创建 Markdown 文件，格式如下：

```markdown
---
title: 文章标题
date: 2024-01-01
---

文章内容...
```
