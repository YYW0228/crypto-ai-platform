# Chainlink 网站分析指导

## 🎯 分析目标
提取 Chainlink 的专业科技感设计元素，应用到 crypto-ai-platform

## 📋 DevTools 分析清单

### 1. 首屏英雄区分析
**网址**: https://chain.link
**步骤**:
1. 打开 Chrome DevTools (F12)
2. 启用设备模拟器 (Ctrl+Shift+M)
3. 分析不同设备下的布局

**记录项目**:
- 核心价值主张文字
- 主 CTA 按钮文字和样式
- 背景色/渐变
- 标题字体大小和行高

### 2. 配色系统提取
**步骤**:
1. 使用检查器选择关键元素
2. 在 Styles 面板记录颜色值
3. 使用吸管工具提取精确色值

**记录**:
```css
/* 记录在此处 */
--primary-color: #______;
--secondary-color: #______;
--accent-color: #______;
--text-color: #______;
--background-color: #______;
```

### 3. 字体系统分析
**记录**:
```css
/* 主标题 */
h1: font-family, font-size, font-weight, line-height

/* 副标题 */
h2: font-family, font-size, font-weight, line-height

/* 正文 */
p: font-family, font-size, line-height
```

## 🎯 分析完成后
将结果填入 `chainlink_analysis_results.json`
