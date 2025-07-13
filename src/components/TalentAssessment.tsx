import React, { useState } from 'react';
import './TalentAssessment.css';

const assessmentTypes = [
  { key: 'knowledge', label: '知识类（考试/测验）' },
  { key: 'experience', label: '经验类（案例/经历/项目）' },
  { key: 'ability', label: '能力类（360/BEI/小组/评价中心）' },
  { key: 'personality', label: '个性类（心理学问卷）' },
  { key: 'disc', label: 'DISC性格测评' },
  { key: 'mbti', label: 'MBTI性格测评' },
  { key: 'big5', label: '大五人格测评' },
  { key: 'values', label: '价值观测评' },
  { key: 'leadership', label: '领导力风格测评' },
  // 可继续扩展
];

const abilityDimensions = [
  { key: 'leadership', label: '领导力', behavior: '能带领团队达成目标，激发成员潜能' },
  { key: 'innovation', label: '创新能力', behavior: '能提出新思路，推动变革' },
  { key: 'execution', label: '执行力', behavior: '能高效落实计划，达成结果' },
  { key: 'communication', label: '沟通影响', behavior: '能清晰表达观点，影响他人' },
  { key: 'teamwork', label: '团队协作', behavior: '能与他人协作，达成共识' },
  { key: 'customer', label: '客户导向', behavior: '关注客户需求，提升客户满意度' },
  // 可继续扩展
];

const assessmentWays = {
  knowledge: ['在线考试', '上传试卷', '线下测验'],
  experience: ['案例描述', '项目经历上传', '行动学习记录'],
  ability: ['360度评估', 'BEI访谈', '小组讨论', '评价中心', '上传测评报告'],
  personality: ['在线问卷', '上传报告'],
};

// 能力词条库（专业版，分层分类，含定义与行为，参考DDI/业界最佳实践）
const abilityDictionary = [
  {
    category: '高层管理者',
    abilities: [
      {
        key: 'strategic_vision',
        label: '战略视野',
        definition: '能够洞察行业趋势，制定前瞻性战略，引领企业持续发展。',
        behaviors: [
          '主动关注外部环境变化，及时调整企业战略',
          '将宏观趋势转化为企业发展机会',
          '推动企业创新和变革，保持行业领先',
          '平衡短期业绩与长期发展',
          '善于整合资源，形成战略协同',
        ],
      },
      {
        key: 'organizational_leadership',
        label: '组织领导力',
        definition: '能够塑造企业文化，激发高管团队协同，带领组织实现愿景。',
        behaviors: [
          '明确传递企业使命与价值观',
          '激励高管团队共同承担责任',
          '在重大变革中保持组织凝聚力',
          '有效授权并监督关键业务',
        ],
      },
      {
        key: 'stakeholder_management',
        label: '利益相关方管理',
        definition: '能够建立并维护关键外部关系，平衡各方利益，推动合作共赢。',
        behaviors: [
          '主动与政府、股东、合作伙伴等建立良好关系',
          '有效应对危机和舆情',
          '在多方利益冲突中寻求平衡',
        ],
      },
      {
        key: 'business_acumen',
        label: '商业敏锐度',
        definition: '能够敏锐把握市场机会，推动企业盈利和增长。',
        behaviors: [
          '洞察市场变化，及时调整业务布局',
          '推动新业务、新模式落地',
          '关注财务健康，优化资源配置',
        ],
      },
      {
        key: 'change_leadership',
        label: '变革领导力',
        definition: '能够带领组织顺利应对变革，激发员工积极参与。',
        behaviors: [
          '主动发起并推动组织变革',
          '有效沟通变革愿景，争取员工支持',
          '识别变革阻力并及时应对',
        ],
      },
      // ...可继续扩展高层管理者能力...
    ],
  },
  {
    category: '中层管理者',
    abilities: [
      {
        key: 'team_leadership',
        label: '团队领导力',
        definition: '能够带领团队实现目标，激发成员潜能，营造积极氛围。',
        behaviors: [
          '设定清晰团队目标并分解任务',
          '激励团队成员持续成长',
          '及时反馈与辅导下属',
          '营造开放、信任的团队氛围',
        ],
      },
      {
        key: 'execution',
        label: '执行力',
        definition: '能够高效落实计划，确保部门目标达成。',
        behaviors: [
          '制定详细执行计划并跟踪进度',
          '主动解决执行过程中的障碍',
          '持续优化流程提升效率',
        ],
      },
      {
        key: 'cross_functional_collaboration',
        label: '跨部门协作',
        definition: '能够推动跨部门合作，整合资源达成组织目标。',
        behaviors: [
          '主动沟通协调，消除部门壁垒',
          '推动资源共享与信息流通',
          '在冲突中寻求共赢解决方案',
        ],
      },
      {
        key: 'coaching',
        label: '辅导与培养',
        definition: '能够发现并培养团队潜力成员，提升整体能力。',
        behaviors: [
          '定期与下属进行一对一辅导',
          '为员工制定发展计划并跟进',
          '鼓励员工自我学习与成长',
        ],
      },
      {
        key: 'customer_orientation',
        label: '客户导向',
        definition: '能够关注客户需求，提升客户满意度。',
        behaviors: [
          '主动收集客户反馈并改进服务',
          '推动团队以客户为中心开展工作',
          '快速响应客户需求变化',
        ],
      },
      // ...可继续扩展中层管理者能力...
    ],
  },
  {
    category: '基层管理者',
    abilities: [
      {
        key: 'task_management',
        label: '任务管理',
        definition: '能够合理分配日常工作任务，确保工作质量与进度。',
        behaviors: [
          '根据工作量合理分配任务',
          '跟进任务进度并及时调整',
          '确保工作安全与合规',
        ],
      },
      {
        key: 'communication',
        label: '沟通协调',
        definition: '能够清晰传达工作要求，积极倾听员工反馈。',
        behaviors: [
          '定期召开班组会议，传达重点信息',
          '主动倾听员工建议和困难',
          '协调解决现场问题',
        ],
      },
      {
        key: 'employee_development',
        label: '员工培养',
        definition: '能够发现并培养团队潜力成员，提升团队整体素质。',
        behaviors: [
          '为新员工提供入职培训',
          '鼓励员工参与技能提升',
          '关注员工成长并给予正向激励',
        ],
      },
      {
        key: 'quality_awareness',
        label: '质量意识',
        definition: '能够严格把控工作质量，确保产品/服务达标。',
        behaviors: [
          '执行标准操作流程',
          '及时发现并纠正质量问题',
          '持续改进工作方法',
        ],
      },
      {
        key: 'safety_management',
        label: '安全管理',
        definition: '能够落实安全生产要求，预防事故发生。',
        behaviors: [
          '定期组织安全培训',
          '检查并消除安全隐患',
          '发生异常时及时上报并处理',
        ],
      },
      // ...可继续扩展基层管理者能力...
    ],
  },
];

const TalentAssessment: React.FC = () => {
  const [selectedType, setSelectedType] = useState('ability');
  const [selectedWay, setSelectedWay] = useState('');
  const [scores, setScores] = useState<{[key:string]:number}>({});
  const [file, setFile] = useState<File|null>(null);
  const [desc, setDesc] = useState('');

  const handleScore = (key: string, value: number) => {
    setScores(prev => ({ ...prev, [key]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  // 按钮功能占位
  const handleSave = () => {
    alert('保存成功（演示功能）');
  };
  const handleExport = () => {
    alert('导出个人/团队报告功能开发中');
  };
  const handleAdvice = () => {
    alert('发展与任用建议（基于721模型）功能开发中');
  };

  return (
    <div className="talent-assessment-container">
      <h2 className="talent-title">人才测评</h2>
      <section className="talent-section">
        <h3>1. 测评类型与方式</h3>
        <div className="talent-row">
          <label>测评类型：</label>
          <select value={selectedType} onChange={e => { setSelectedType(e.target.value); setSelectedWay(''); }}>
            {assessmentTypes.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
          </select>
          <label style={{marginLeft:16}}>测评方式：</label>
          <select value={selectedWay} onChange={e => setSelectedWay(e.target.value)}>
            <option value="">请选择</option>
            {assessmentWays[selectedType as keyof typeof assessmentWays].map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
      </section>
      {selectedType === 'ability' && (
        <section className="talent-section">
          <h3>2. 能力测评（行为化定义）</h3>
          <div className="talent-tip">请对下列能力进行1-5分自评或他评，并参考行为化描述。</div>
          <div className="talent-ability-table">
            {abilityDimensions.map(dim => (
              <div key={dim.key} className="talent-ability-row">
                <span className="talent-ability-label">{dim.label}</span>
                <span className="talent-ability-behavior">{dim.behavior}</span>
                <span className="talent-ability-options">
                  {[1,2,3,4,5].map(score => (
                    <label key={score} className="talent-ability-radio">
                      <input type="radio" name={dim.key} value={score} checked={scores[dim.key]===score} onChange={()=>handleScore(dim.key,score)} />{score}
                    </label>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
      {selectedType === 'knowledge' && (
        <section className="talent-section">
          <h3>2. 知识测评</h3>
          <div className="talent-tip">可在线考试或上传试卷，系统自动评分或人工批阅。</div>
          <input type="file" onChange={handleFile} />
        </section>
      )}
      {selectedType === 'experience' && (
        <section className="talent-section">
          <h3>2. 经验测评</h3>
          <div className="talent-tip">请上传项目经历、案例描述或行动学习记录。</div>
          <input type="file" onChange={handleFile} />
        </section>
      )}
      {selectedType === 'personality' && (
        <section className="talent-section">
          <h3>2. 个性测评</h3>
          <div className="talent-tip">可在线填写心理学问卷或上传相关报告。</div>
          <input type="file" onChange={handleFile} />
        </section>
      )}
      {selectedType === 'disc' && (
        <section className="talent-section">
          <h3>2. DISC性格测评</h3>
          <div className="talent-tip">（端口预留）可在线作答DISC问卷，自动判定类型与发展建议。内容可共创。</div>
        </section>
      )}
      {selectedType === 'mbti' && (
        <section className="talent-section">
          <h3>2. MBTI性格测评</h3>
          <div className="talent-tip">（端口预留）可在线作答MBTI问卷，自动判定类型与发展建议。内容可共创。</div>
        </section>
      )}
      {selectedType === 'big5' && (
        <section className="talent-section">
          <h3>2. 大五人格测评</h3>
          <div className="talent-tip">（端口预留）可在线作答大五人格问卷，自动判定类型与发展建议。内容可共创。</div>
        </section>
      )}
      {selectedType === 'values' && (
        <section className="talent-section">
          <h3>2. 价值观测评</h3>
          <div className="talent-tip">（端口预留）可在线作答价值观问卷，自动分析价值观类型。内容可共创。</div>
        </section>
      )}
      {selectedType === 'leadership' && (
        <section className="talent-section">
          <h3>2. 领导力风格测评</h3>
          <div className="talent-tip">（端口预留）可在线作答领导力风格问卷，自动分析风格与建议。内容可共创。</div>
        </section>
      )}
      <section className="talent-section">
        <h3>3. 补充说明</h3>
        <textarea className="talent-textarea" placeholder="如需补充说明测评背景、特殊情况等..." value={desc} onChange={e => setDesc(e.target.value)} rows={3} />
      </section>
      <div className="talent-actions">
        <button className="business-btn" type="button" onClick={handleSave}>保存测评</button>
        <button className="business-btn business-btn-secondary" type="button" onClick={handleExport}>导出报告</button>
        <button className="business-btn business-btn-link" type="button" onClick={handleAdvice}>发展与任用建议</button>
      </div>
    </div>
  );
};

export default TalentAssessment;
