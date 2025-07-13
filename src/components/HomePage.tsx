import React, { useState } from 'react';
import BrandHeader from './BrandHeader';
import './BrandHeader.css';
import './HomePage.css';
import BusinessContext from './BusinessContext';
import LearningNeeds from './LearningNeeds';
import TalentAssessment from './TalentAssessment';
import LearningProject from './LearningProject';
import CourseDesign from './CourseDesign';
import ResourcePool from './ResourcePool';
import OperationService from './OperationService';
import DataAnalysis from './DataAnalysis';
import AISmart from './AISmart';
import KnowledgeManagement from './KnowledgeManagement';
import EvaluationFeedback from './EvaluationFeedback';
import SystemPlatform from './SystemPlatform';
import InnovationPractice from './InnovationPractice';
import ServiceMethod from './ServiceMethod';
import TeamInfo from './TeamInfo';

const brandSlogan = '伟大的组织成就卓越的个人，缔造面向未来的领导者';

const modules = [
  { title: '商业环境', desc: '战略发展、组织能力、业务聚焦' },
  { title: '培训需求', desc: '需求收集、归档、分析' },
  { title: '人才测评', desc: '多工具、多场景测评，智能匹配' },
  { title: '学习项目', desc: '设计/策划、运营/交付、行动学习、真实业务项目' },
  { title: '课程设计', desc: '主题开发、课程库、课程方案、课程大纲、课件产出' },
  { title: '资源开发', desc: '讲师、教练、专家、内容、案例、工具' },
  { title: '运营服务', desc: '学员管理、激励、成果、报名、签到、互动' },
  { title: '数据分析', desc: '多维度分析、趋势图表、智能报告' },
  { title: 'AI智能', desc: 'AI/Agent角色、内容生成、自适应学习' },
  { title: '知识管理', desc: '知识库、智能检索、创新孵化' },
  { title: '评估反馈', desc: '复盘、经验沉淀、优化建议' },
  { title: '学习系统平台', desc: '架构、权限、接口、多端适配' },
  { title: '创新实践', desc: '行业案例、创新项目、最佳实践分享' },
  { title: '服务方式', desc: '定制化培训、咨询服务、线上线下融合、长期陪伴，联系方式：contact@leadershipfactory.com' },
  { title: '团队信息', desc: '核心成员介绍、专业背景、实战经验' },
];

const HomePage: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const handleModuleClick = (title: string) => {
    setActiveModule(title);
  };

  const handleBack = () => {
    setActiveModule(null);
  };

  return (
    <div className="homepage-container">
      <BrandHeader slogan={brandSlogan} />
      <main className="homepage-main">
        {activeModule === null ? (
          modules.map((m, i) => (
            <section key={i} className="module-card" id={`module${i+1}`} onClick={() => handleModuleClick(m.title)} style={{cursor:'pointer'}}>
              <h2>{m.title}</h2>
              <p>{m.desc}</p>
            </section>
          ))
        ) : (
          <div style={{width:'100%'}}>
            {activeModule === '商业环境' && <BusinessContext />}
            {activeModule === '培训需求' && <LearningNeeds />}
            {activeModule === '人才测评' && <TalentAssessment />}
            {activeModule === '学习项目' && <LearningProject />}
            {activeModule === '课程设计' && <CourseDesign />}
            {activeModule === '资源开发' && <ResourcePool />}
            {activeModule === '运营服务' && <OperationService onBack={handleBack} />}
            {activeModule === '数据分析' && <DataAnalysis />}
            {activeModule === 'AI智能' && <AISmart />}
            {activeModule === '知识管理' && <KnowledgeManagement />}
            {activeModule === '评估反馈' && <EvaluationFeedback />}
            {activeModule === '学习系统平台' && <SystemPlatform />}
            {activeModule === '创新实践' && <InnovationPractice />}
            {activeModule === '服务方式' && <ServiceMethod />}
            {activeModule === '团队信息' && <TeamInfo />}
            {/* 未来可按模块名加载不同组件 */}
            {activeModule !== '运营服务' && (
              <button className="business-btn" style={{marginTop:24}} onClick={handleBack} type="button">返回首页</button>
            )}
          </div>
        )}
      </main>
      <footer className="homepage-footer">
        © 2025 Leadership Factory | 专业 · 智能 · 创新
      </footer>
    </div>
  );
};

export default HomePage;
