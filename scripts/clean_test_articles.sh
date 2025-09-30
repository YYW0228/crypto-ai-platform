#!/bin/bash

# 🧹 清理测试文章脚本
# 移除之前导入的测试文章，保留核心的示例文章

echo "🧹 开始清理测试文章..."

PROJECT_ROOT="$(pwd)"
CONTENT_DIR="$PROJECT_ROOT/content/posts"

# 保留的文章列表（核心示例）
KEEP_ARTICLES=(
    "2025-09-30-five-lessons.md"
)

echo "📋 保留的核心文章:"
for article in "${KEEP_ARTICLES[@]}"; do
    echo "   ✅ $article"
done

echo ""
echo "🗑️ 移除测试文章:"

# 移除测试文章
cd "$CONTENT_DIR"
for file in *.md; do
    if [[ ! " ${KEEP_ARTICLES[@]} " =~ " ${file} " ]]; then
        echo "   🗑️ 移除: $file"
        rm "$file"
    fi
done

echo ""
echo "🔄 更新学习路径数据..."

# 重置学习路径为基础版本
cat > "$PROJECT_ROOT/src/data/learning_paths.ts" << 'EOF'
export const learningPaths = [
  {
    title: "五条投资与 AI 学习心得",
    description: "从投资纪律到 AI Agent 开发，5个核心心得帮你建立正确的学习和投资理念。",
    slug: "2025-09-30-five-lessons",
    difficulty: "beginner" as const,
    estimatedTime: "15 分钟",
    tags: ["投资心得", "AI学习", "入门指南"],
    isCompleted: false,
    completionRate: 0
  },
  // 更多文章将通过文章管理系统添加...
];

// 按类别分组的学习路径
export const learningPathsByCategory = {
  "入门基础": learningPaths.filter(path => path.difficulty === "beginner"),
  "进阶实战": learningPaths.filter(path => path.difficulty === "intermediate"),
  "专家级": learningPaths.filter(path => path.difficulty === "advanced")
};

// 按标签分组
export const learningPathsByTag = learningPaths.reduce((acc, path) => {
  path.tags.forEach(tag => {
    if (!acc[tag]) acc[tag] = [];
    acc[tag].push(path);
  });
  return acc;
}, {} as Record<string, typeof learningPaths>);

// 获取推荐的学习路径
export const getRecommendedPaths = (completedSlugs: string[] = []) => {
  const completed = new Set(completedSlugs);
  const available = learningPaths.filter(path => !path.isLocked || completedSlugs.length > 0);
  const notCompleted = available.filter(path => !completed.has(path.slug));
  
  return notCompleted.slice(0, 3);
};

// 计算学习进度
export const calculateProgress = (completedSlugs: string[] = []) => {
  const totalCourses = learningPaths.length;
  const completedCourses = completedSlugs.length;
  return Math.round((completedCourses / totalCourses) * 100);
};
EOF

echo "✅ 学习路径数据已重置"

echo ""
echo "📊 清理完成统计:"
echo "   保留文章: ${#KEEP_ARTICLES[@]} 篇"
echo "   移除文章: $(ls -1 "$CONTENT_DIR" 2>/dev/null | grep -v -F -f <(printf '%s\n' "${KEEP_ARTICLES[@]}") | wc -l) 篇"

echo ""
echo "🎯 现在你有一个干净的平台，可以开始添加你的专业文章了！"
echo ""
echo "📝 下一步:"
echo "1. 使用文章管理系统创建新文章"
echo "2. 在专用文章仓库中编写内容"
echo "3. 使用发布脚本一键发布"