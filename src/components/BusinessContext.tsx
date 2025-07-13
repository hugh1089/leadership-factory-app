import React, { useState } from 'react';
import './BusinessContext.css';

const industryTrendsOptions = [
  '数字化转型',
  '行业竞争加剧',
  '政策支持创新',
  '绿色低碳',
  '国际化发展',
  '客户需求变化',
  '技术升级',
  '供应链波动',
  '资本市场变化',
  '人口结构变化',
  '法规合规压力',
  '新兴市场机会',
  '客户体验升级',
  '人才争夺',
  '成本压力',
];

const businessPainOptions = [
  '新产品推广难',
  '人才储备不足',
  '客户需求变化快',
  '市场拓展压力大',
  '成本控制难',
  '团队协作障碍',
  '创新能力不足',
  '数字化转型慢',
  '品牌影响力弱',
  '供应链不稳定',
  '政策应对难',
  '组织结构臃肿',
  '激励机制不完善',
  '管理层共识不足',
];

const orgHealthDimensions = [
  { key: 'direction', label: '方向感（战略清晰、目标一致）' },
  { key: 'leadership', label: '领导力（高管榜样、管理层驱动力）' },
  { key: 'culture', label: '文化（价值观、氛围、信任）' },
  { key: 'execution', label: '执行力（流程、责任、落地）' },
  { key: 'innovation', label: '创新（变革、学习、开放）' },
  { key: 'talent', label: '人才（吸引、发展、保留）' },
  { key: 'incentive', label: '激励（薪酬、认可、成长）' },
  { key: 'collaboration', label: '协作（跨部门、团队合作）' },
];

const orgHealthOptions = [
  { value: 5, label: '非常优秀' },
  { value: 4, label: '较为优秀' },
  { value: 3, label: '一般' },
  { value: 2, label: '有待提升' },
  { value: 1, label: '明显短板' },
];

const BusinessContext: React.FC = () => {
  const [industryTrends, setIndustryTrends] = useState<string[]>([]);
  const [industryTrendsInput, setIndustryTrendsInput] = useState('');
  const [businessPain, setBusinessPain] = useState<string[]>([]);
  const [businessPainInput, setBusinessPainInput] = useState('');
  const [orgHealth, setOrgHealth] = useState<{[key:string]:number}>({});

  const handleMultiSelect = (option: string, selected: string[], setSelected: (v: string[]) => void) => {
    setSelected(selected.includes(option) ? selected.filter(o => o !== option) : [...selected, option]);
  };

  const handleOrgHealthChange = (key: string, value: number) => {
    setOrgHealth(prev => ({ ...prev, [key]: value }));
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
    <div className="business-context-container">
      <h2 className="business-context-title">商业环境分析</h2>
      <section className="business-section">
        <h3>1. 行业与市场趋势</h3>
        <p>请选择行业趋势（可多选），或自定义补充：</p>
        <div className="multi-select-row">
          {industryTrendsOptions.map(opt => (
            <label key={opt} className={`multi-select-option${industryTrends.includes(opt) ? ' selected' : ''}`}
              onClick={() => handleMultiSelect(opt, industryTrends, setIndustryTrends)}>{opt}</label>
          ))}
        </div>
        <input className="multi-select-input" placeholder="自定义补充..." value={industryTrendsInput} onChange={e => setIndustryTrendsInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && industryTrendsInput.trim()) { setIndustryTrends([...industryTrends, industryTrendsInput.trim()]); setIndustryTrendsInput(''); } }} />
      </section>
      <section className="business-section">
        <h3>2. 组织战略与目标</h3>
        <p>请填写企业当前的战略方向、年度目标和核心业务板块。</p>
        <textarea placeholder="如：聚焦智能制造，2025年营收增长20%，拓展海外市场……" rows={3} />
      </section>
      <section className="business-section">
        <h3>3. 关键业务聚焦与痛点</h3>
        <p>请选择当前关注的业务痛点（可多选），或自定义补充：</p>
        <div className="multi-select-row">
          {businessPainOptions.map(opt => (
            <label key={opt} className={`multi-select-option${businessPain.includes(opt) ? ' selected' : ''}`}
              onClick={() => handleMultiSelect(opt, businessPain, setBusinessPain)}>{opt}</label>
          ))}
        </div>
        <input className="multi-select-input" placeholder="自定义补充..." value={businessPainInput} onChange={e => setBusinessPainInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && businessPainInput.trim()) { setBusinessPain([...businessPain, businessPainInput.trim()]); setBusinessPainInput(''); } }} />
      </section>
      <section className="business-section">
        <h3>4. 组织能力现状</h3>
        <p>请评估组织在以下维度的健康状况：</p>
        <div className="org-health-table">
          {orgHealthDimensions.map(dim => (
            <div key={dim.key} className="org-health-row">
              <span className="org-health-label">{dim.label}</span>
              <span className="org-health-options">
                {orgHealthOptions.map(opt => (
                  <label key={opt.value} className="org-health-radio">
                    <input
                      type="radio"
                      name={dim.key}
                      value={opt.value}
                      checked={orgHealth[dim.key] === opt.value}
                      onChange={() => handleOrgHealthChange(dim.key, opt.value)}
                    />
                    {opt.label}
                  </label>
                ))}
              </span>
            </div>
          ))}
        </div>
        <textarea placeholder="补充说明：如技术创新能力强，市场拓展有待提升，团队协作需加强……" rows={2} style={{marginTop:8}} />
      </section>
      <section className="business-section">
        <h3>5. 结论与建议</h3>
        <p>系统可根据以上内容自动生成分析结论，或由专家补充建议，为后续培训需求与项目设计提供依据。</p>
        <textarea placeholder="如：建议加强市场敏锐度培训，提升团队协作能力，关注创新人才引进……" rows={3} />
      </section>
      <div className="business-actions">
        <button className="business-btn" type="button" onClick={handleSave}>保存分析</button>
        <button className="business-btn business-btn-secondary" type="button" onClick={handleExport}>导出报告</button>
        <button className="business-btn business-btn-link" type="button" onClick={handleNext}>流转到下一个环节</button>
      </div>
    </div>
  );
};

export default BusinessContext;
