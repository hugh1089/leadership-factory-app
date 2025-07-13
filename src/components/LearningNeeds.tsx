import React, { useState } from 'react';
import './LearningNeeds.css';

const roles = [
  'CEO', '副总裁/副总经理', '总监', '部门负责人', 'HR', '员工', '项目经理', '业务骨干',
];

const sources = [
  '问卷调研',
  '访谈',
  '年度计划',
  '绩效考核',
  '业务数据分析',
  '战略解读',
];

const businessGoals = [
  '提升管理能力',
  '支持业务转型',
  '推动创新',
  '优化流程',
  '提升客户满意度',
  '加强团队协作',
  '人才梯队建设',
  '降本增效',
];

const knowledgeTags = [
  '组织知识', '专业知识', '行业知识', '产品知识', '政策法规', '市场知识', '客户知识',
];
const abilityTags = [
  '战略思维', '创新能力', '团队管理', '沟通影响', '项目管理', '客户导向', '数字化素养',
  '变革管理', '跨部门协作', '自我驱动', '业务洞察', '冲突管理', '教练辅导', '人才发展', '执行力',
  '学习能力', '分析决策', '抗压能力', '资源整合', '计划组织',
];
const experienceTags = [
  '岗位轮换', '跨部门协作', '项目经验', '海外经历', '行动学习', '混合式学习', '实战演练', '导师辅导',
];
const valueTags = [
  '诚信正直', '责任担当', '客户为先', '创新进取', '协作共赢', '学习成长', '开放包容', '敬业精神',
];

const priorities = [
  '高', '中', '低'
];

const LearningNeeds: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [goalInput, setGoalInput] = useState('');
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);
  const [abilityInput, setAbilityInput] = useState('');
  const [selectedKnowledge, setSelectedKnowledge] = useState<string[]>([]);
  const [knowledgeInput, setKnowledgeInput] = useState('');
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [experienceInput, setExperienceInput] = useState('');
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [valueInput, setValueInput] = useState('');
  const [priority, setPriority] = useState('中');
  const [desc, setDesc] = useState('');

  const handleMultiSelect = (option: string, selected: string[], setSelected: (v: string[]) => void) => {
    setSelected(selected.includes(option) ? selected.filter(o => o !== option) : [...selected, option]);
  };

  // 按钮功能占位
  const handleSave = () => {
    alert('保存成功（演示功能）');
  };
  const handleExport = () => {
    alert('导出PDF功能开发中');
  };
  const handleNext = () => {
    alert('流转到下一个环节功能开发中');
  };

  return (
    <div className="learning-needs-container">
      <h2 className="learning-needs-title">学习需求收集与分析</h2>
      <section className="learning-section">
        <h3>1. 需求来源与角色</h3>
        <div className="learning-tip">请明确本次学习需求的提出者及收集方式，便于后续归类和追溯。</div>
        <div className="learning-row">
          <label>需求提出者：</label>
          <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
            <option value="">请选择</option>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <label style={{marginLeft:16}}>收集方式：</label>
          <select value={selectedSource} onChange={e => setSelectedSource(e.target.value)}>
            <option value="">请选择</option>
            {sources.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </section>
      <section className="learning-section">
        <h3>2. 学习目标与业务关联</h3>
        <div className="learning-tip">请结合组织战略、业务目标，明确本次学习需求希望支持的业务方向和目标。</div>
        <p>请选择或补充本次学习需求关联的业务目标：</p>
        <div className="multi-select-row">
          {businessGoals.map(opt => (
            <label key={opt} className={`multi-select-option${selectedGoals.includes(opt) ? ' selected' : ''}`}
              onClick={() => handleMultiSelect(opt, selectedGoals, setSelectedGoals)}>{opt}</label>
          ))}
        </div>
        <input className="multi-select-input" placeholder="自定义补充..." value={goalInput} onChange={e => setGoalInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && goalInput.trim()) { setSelectedGoals([...selectedGoals, goalInput.trim()]); setGoalInput(''); } }} />
      </section>
      <section className="learning-section">
        <h3>3. 能力/主题需求</h3>
        <div className="learning-tip">请从知识、能力、经验、个性/价值观四个方面，选择或补充本次学习所需提升的内容。</div>
        <p>请选择或补充本次学习所需提升的内容（可多选）：</p>
        <div className="learning-subsection">
          <b>知识：</b> <span className="learning-tip-inline">如组织知识、专业知识、行业知识等</span>
          <div className="multi-select-row">
            {knowledgeTags.map(opt => (
              <label key={opt} className={`multi-select-option${selectedKnowledge.includes(opt) ? ' selected' : ''}`}
                onClick={() => handleMultiSelect(opt, selectedKnowledge, setSelectedKnowledge)}>{opt}</label>
            ))}
          </div>
          <input className="multi-select-input" placeholder="自定义补充..." value={knowledgeInput} onChange={e => setKnowledgeInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && knowledgeInput.trim()) { setSelectedKnowledge([...selectedKnowledge, knowledgeInput.trim()]); setKnowledgeInput(''); } }} />
        </div>
        <div className="learning-subsection">
          <b>能力：</b> <span className="learning-tip-inline">如战略思维、创新能力、团队管理等</span>
          <div className="multi-select-row">
            {abilityTags.map(opt => (
              <label key={opt} className={`multi-select-option${selectedAbilities.includes(opt) ? ' selected' : ''}`}
                onClick={() => handleMultiSelect(opt, selectedAbilities, setSelectedAbilities)}>{opt}</label>
            ))}
          </div>
          <input className="multi-select-input" placeholder="自定义补充..." value={abilityInput} onChange={e => setAbilityInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && abilityInput.trim()) { setSelectedAbilities([...selectedAbilities, abilityInput.trim()]); setAbilityInput(''); } }} />
        </div>
        <div className="learning-subsection">
          <b>经验：</b> <span className="learning-tip-inline">如岗位轮换、项目经验、行动学习等</span>
          <div className="multi-select-row">
            {experienceTags.map(opt => (
              <label key={opt} className={`multi-select-option${selectedExperience.includes(opt) ? ' selected' : ''}`}
                onClick={() => handleMultiSelect(opt, selectedExperience, setSelectedExperience)}>{opt}</label>
            ))}
          </div>
          <input className="multi-select-input" placeholder="自定义补充..." value={experienceInput} onChange={e => setExperienceInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && experienceInput.trim()) { setSelectedExperience([...selectedExperience, experienceInput.trim()]); setExperienceInput(''); } }} />
        </div>
        <div className="learning-subsection">
          <b>个性/价值观：</b> <span className="learning-tip-inline">如诚信正直、责任担当、客户为先等</span>
          <div className="multi-select-row">
            {valueTags.map(opt => (
              <label key={opt} className={`multi-select-option${selectedValue.includes(opt) ? ' selected' : ''}`}
                onClick={() => handleMultiSelect(opt, selectedValue, setSelectedValue)}>{opt}</label>
            ))}
          </div>
          <input className="multi-select-input" placeholder="自定义补充..." value={valueInput} onChange={e => setValueInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && valueInput.trim()) { setSelectedValue([...selectedValue, valueInput.trim()]); setValueInput(''); } }} />
        </div>
      </section>
      <section className="learning-section">
        <h3>4. 优先级与补充说明</h3>
        <div className="learning-tip">请根据实际业务需求，合理设置优先级，并补充相关背景说明。</div>
        <div className="learning-row">
          <label>优先级：</label>
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            {priorities.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <textarea className="learning-textarea" placeholder="补充说明，如具体业务场景、历史需求、特殊要求等..." value={desc} onChange={e => setDesc(e.target.value)} rows={3} />
      </section>
      <div className="learning-actions">
        <button className="business-btn" type="button" onClick={handleSave}>保存需求</button>
        <button className="business-btn business-btn-secondary" type="button" onClick={handleExport}>导出报告</button>
        <button className="business-btn business-btn-link" type="button" onClick={handleNext}>流转到下一个环节</button>
      </div>
    </div>
  );
};

export default LearningNeeds;
