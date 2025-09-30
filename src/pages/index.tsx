import OptimizedHeroSection from '../components/OptimizedHeroSection';
import { LearningPathGrid } from '../components/LearningPathCard';
import { learningPaths } from '../data/learning_paths';

export default function OptimizedHome() {
  return (
    <>
      <OptimizedHeroSection />
      <LearningPathGrid 
        courses={learningPaths}
        title="系统化学习路径"
        description="从基础到进阶，跟随专业课程体系掌握 Crypto x AI 核心技能"
      />
    </>
  );
}
