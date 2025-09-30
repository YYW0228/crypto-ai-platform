# 📝 Crypto AI 平台文章管理指南

## 🎯 完整工作流程

### 1. 📁 文章存储结构
```
~/Documents/crypto-ai-articles/              # 你的专用文章仓库
├── drafts/                                  # 🟡 草稿阶段
├── ready-to-publish/                        # 🟢 准备发布
├── published/archive/                       # ✅ 已发布归档
├── templates/                               # 📋 文章模板
└── assets/                                  # 🖼️ 图片和资源
```

### 2. 🔄 日常写作工作流

#### 步骤 1: 创建新文章
```bash
cd crypto-ai-demo
./scripts/new_article.sh "我的新文章标题"
```
这会在 `drafts/` 文件夹创建一个新的文章文件。

#### 步骤 2: 写作和编辑
在 `~/Documents/crypto-ai-articles/drafts/` 中编辑你的文章。

#### 步骤 3: 准备发布
完成文章后，将文件从 `drafts/` 移动到 `ready-to-publish/`：
```bash
mv ~/Documents/crypto-ai-articles/drafts/2024-10-01-我的新文章.md \
   ~/Documents/crypto-ai-articles/ready-to-publish/
```

#### 步骤 4: 一键发布
```bash
cd crypto-ai-demo
./scripts/publish_article.sh
```
这个脚本会：
- 复制文章到网站项目
- 自动 Git 提交和推送
- 将文章移动到已发布归档
- 触发 Cloudflare Pages 自动部署

## 🛠️ 实用命令

### 查看文章状态
```bash
cd crypto-ai-demo
./scripts/article_status.sh
```

### 创建不同类型的文章
```bash
# 基础文章（默认）
./scripts/new_article.sh "文章标题"

# 教程类文章
./scripts/new_article.sh "教程标题" tutorial

# 分析报告
./scripts/new_article.sh "分析报告标题" analysis
```

## 📋 文章格式标准

### 必需的前置元数据
```yaml
---
title: 文章标题
date: 2024-10-01
category: 量化交易|AI开发|Web3技术|开发工具|套利交易
difficulty: beginner|intermediate|advanced
tags: [标签1, 标签2, 标签3]
estimatedTime: "30 分钟"
author: 你的名字
description: SEO描述（一句话总结）
---
```

### 推荐的文章结构
1. **概述** - 问题和价值
2. **背景知识** - 必要的基础概念
3. **核心内容** - 主要内容
4. **实战案例** - 代码或步骤示例
5. **注意事项** - 风险和注意点
6. **总结** - 要点回顾

## 🚀 自动化特性

### 自动 Git 管理
- 发布脚本自动提交和推送
- 包含时间戳的提交信息
- 自动触发网站部署

### 智能文件管理
- 自动移动已发布文章到归档
- 保持工作目录整洁
- 防止重复发布

### 模板系统
- 3种文章模板：基础、教程、分析
- 自动生成文件名和日期
- 标准化的文章格式

## 📊 最佳实践

### 写作建议
1. **标题要具体** - 避免模糊的标题
2. **描述要吸引人** - 用于 SEO 和社交分享
3. **标签要精准** - 便于读者发现相关内容
4. **预估时间要准确** - 帮助读者规划学习时间

### 发布时机
- **工作日发布** - 获得更好的阅读量
- **定期发布** - 建立读者期待
- **质量优于数量** - 宁缺毋滥

### 内容策略
- **系列文章** - 深入某个主题
- **实战导向** - 提供可操作的内容
- **案例丰富** - 真实的代码和示例

## 🔍 故障排除

### 常见问题

**Q: 发布脚本报错怎么办？**
A: 检查文章格式，确保前置元数据完整。

**Q: 如何修改已发布的文章？**
A: 从归档中复制文章，修改后重新发布。

**Q: 如何批量发布多篇文章？**
A: 将多篇文章放入 `ready-to-publish/`，运行发布脚本即可。

**Q: 如何备份文章？**
A: 文章仓库本身就是备份，建议定期同步到云存储。

## 📞 技术支持

如果遇到问题：
1. 检查脚本权限：`chmod +x scripts/*.sh`
2. 验证文章格式是否正确
3. 查看 Git 状态：`git status`
4. 检查网络连接和 GitHub 访问

---

**🎉 恭喜！你现在拥有了一个专业的文章管理和发布系统！**