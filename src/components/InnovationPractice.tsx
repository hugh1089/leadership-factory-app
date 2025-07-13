import React, { useState } from 'react';

// 创新实践模块主区块
const sections = [
  { key: 'cases', label: '行业案例库' },
  { key: 'incubation', label: '创新项目孵化' },
  { key: 'sharing', label: '最佳实践分享' },
  { key: 'tools', label: '创新工具箱' },
  { key: 'ai', label: 'AI创新助理' }
];

const InnovationPractice: React.FC = () => {
  const [active, setActive] = useState('cases');

  // 行业案例库区块细化
  const renderCases = () => (
    <div>
      <h3 style={{ color: '#1769aa', marginBottom: 16 }}>行业案例库</h3>
      <div style={{ background: '#f9fafb', borderRadius: 8, padding: 20, minHeight: 120 }}>
        <b>精选案例</b>
        <ul style={{ margin: '12px 0 0 0', padding: 0, listStyle: 'none', fontSize: 15 }}>
          <li style={{ marginBottom: 8 }}>
            <div style={{ fontWeight: 500 }}>某制造业数字化转型创新</div>
            <div style={{ color: '#888', fontSize: 13 }}>关键词：数字化、流程再造、降本增效</div>
            <button style={{ marginTop: 4, fontSize: 13, color: '#1769aa', background: 'none', border: 'none', cursor: 'pointer' }}>AI解读</button>
          </li>
          <li style={{ marginBottom: 8 }}>
            <div style={{ fontWeight: 500 }}>某互联网企业敏捷组织实践</div>
            <div style={{ color: '#888', fontSize: 13 }}>关键词：敏捷、组织变革、团队协作</div>
            <button style={{ marginTop: 4, fontSize: 13, color: '#1769aa', background: 'none', border: 'none', cursor: 'pointer' }}>AI解读</button>
          </li>
          <li>
            <div style={{ fontWeight: 500 }}>某金融机构AI驱动业务创新</div>
            <div style={{ color: '#888', fontSize: 13 }}>关键词：AI、智能风控、客户体验</div>
            <button style={{ marginTop: 4, fontSize: 13, color: '#1769aa', background: 'none', border: 'none', cursor: 'pointer' }}>AI解读</button>
          </li>
        </ul>
        <div style={{ marginTop: 16 }}>
          <input style={{ border: '1px solid #ccc', borderRadius: 4, padding: '4px 8px', width: 220 }} placeholder="搜索案例/关键词..." />
          <button style={{ marginLeft: 8, border: '1px solid #1769aa', borderRadius: 4, background: '#1769aa', color: '#fff', padding: '4px 16px' }}>搜索</button>
        </div>
      </div>
    </div>
  );

  // 创新项目孵化区块细化
  const renderIncubation = () => (
    <div>
      <h3 style={{ color: '#1769aa', marginBottom: 16 }}>创新项目孵化</h3>
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, minHeight: 120, boxShadow: '0 1px 4px #eee' }}>
        <b>发起/管理创新项目</b>
        <div style={{ marginTop: 12, fontSize: 15 }}>
          <div>项目名称：<input style={{ marginLeft: 8, borderRadius: 4, border: '1px solid #ccc', padding: '2px 8px', width: 220 }} placeholder="如：AI赋能运营创新" /></div>
          <div style={{ marginTop: 8 }}>项目目标：<input style={{ marginLeft: 8, borderRadius: 4, border: '1px solid #ccc', padding: '2px 8px', width: 320 }} placeholder="简要描述创新目标" /></div>
          <div style={{ marginTop: 8 }}>团队成员：<input style={{ marginLeft: 8, borderRadius: 4, border: '1px solid #ccc', padding: '2px 8px', width: 200 }} placeholder="可多人协作，逗号分隔" /></div>
          <div style={{ marginTop: 8 }}>进度：<progress value={40} max={100} style={{ verticalAlign: 'middle', marginLeft: 8 }} /> <span style={{ color: '#1769aa' }}>40%</span></div>
          <button style={{ marginTop: 12, border: '1px solid #1769aa', borderRadius: 4, background: '#1769aa', color: '#fff', padding: '6px 16px' }}>AI生成项目计划</button>
        </div>
        <div style={{ marginTop: 20, background: '#f9fafb', borderRadius: 6, padding: 16 }}>
          <b>项目动态</b>
          <ul style={{ margin: '10px 0 0 0', padding: 0, listStyle: 'none', fontSize: 14 }}>
            <li>2025-06-07 发起项目“AI赋能运营创新”</li>
            <li>2025-06-08 团队成员补充，目标细化</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // 最佳实践分享区块细化
  const renderSharing = () => (
    <div>
      <h3 style={{ color: '#1769aa', marginBottom: 16 }}>最佳实践分享</h3>
      <div style={{ background: '#f9fafb', borderRadius: 8, padding: 20, minHeight: 120 }}>
        <b>创新成果/经验发布</b>
        <div style={{ marginTop: 12, fontSize: 15 }}>
          <textarea style={{ width: '100%', minHeight: 60, borderRadius: 4, border: '1px solid #ccc' }} placeholder="分享你的创新实践、方法、经验..." />
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <button style={{ border: '1px solid #1769aa', borderRadius: 4, background: '#1769aa', color: '#fff', padding: '6px 16px' }}>发布</button>
            <button style={{ border: '1px solid #1769aa', borderRadius: 4, background: '#fff', color: '#1769aa', padding: '6px 16px' }}>AI摘要/润色</button>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <b>最新分享</b>
          <ul style={{ margin: '10px 0 0 0', padding: 0, listStyle: 'none', fontSize: 14 }}>
            <li>2025-06-07 “AI驱动业务创新”最佳实践</li>
            <li>2025-06-06 “敏捷组织转型”经验分享</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // 创新工具箱区块细化
  const renderTools = () => (
    <div>
      <h3 style={{ color: '#1769aa', marginBottom: 16 }}>创新工具箱</h3>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: 20, minHeight: 120, boxShadow: '0 1px 4px #eee' }}>
          <b>头脑风暴</b>
          <div style={{ marginTop: 12 }}>
            <textarea style={{ width: '100%', minHeight: 40, borderRadius: 4, border: '1px solid #ccc' }} placeholder="输入主题，AI协助头脑风暴..." />
            <button style={{ marginTop: 8, border: '1px solid #1769aa', borderRadius: 4, background: '#1769aa', color: '#fff', padding: '4px 12px' }}>AI生成创意</button>
          </div>
        </div>
        <div style={{ flex: 1, background: '#f9fafb', borderRadius: 8, padding: 20, minHeight: 120 }}>
          <b>SWOT分析</b>
          <div style={{ marginTop: 12 }}>
            <textarea style={{ width: '100%', minHeight: 40, borderRadius: 4, border: '1px solid #ccc' }} placeholder="输入项目/主题，AI协助SWOT分析..." />
            <button style={{ marginTop: 8, border: '1px solid #1769aa', borderRadius: 4, background: '#1769aa', color: '#fff', padding: '4px 12px' }}>AI生成分析</button>
          </div>
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: 20, minHeight: 120, boxShadow: '0 1px 4px #eee' }}>
          <b>创新画布</b>
          <div style={{ marginTop: 12 }}>
            <textarea style={{ width: '100%', minHeight: 40, borderRadius: 4, border: '1px solid #ccc' }} placeholder="输入创新项目要素，AI协助生成创新画布..." />
            <button style={{ marginTop: 8, border: '1px solid #1769aa', borderRadius: 4, background: '#1769aa', color: '#fff', padding: '4px 12px' }}>AI生成画布</button>
          </div>
        </div>
      </div>
    </div>
  );

  // AI创新助理区块细化
  const renderAI = () => (
    <div>
      <h3 style={{ color: '#1769aa', marginBottom: 16 }}>AI创新助理</h3>
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, minHeight: 120, boxShadow: '0 1px 4px #eee' }}>
        <b>AI对话区</b>
        <div style={{ marginTop: 12 }}>
          <textarea style={{ width: '100%', minHeight: 40, borderRadius: 4, border: '1px solid #ccc' }} placeholder="向AI提问创新相关问题、获取建议、自动生成方案..." />
          <button style={{ marginTop: 8, border: '1px solid #1769aa', borderRadius: 4, background: '#1769aa', color: '#fff', padding: '4px 12px' }}>发送</button>
        </div>
        <div style={{ marginTop: 20, background: '#f9fafb', borderRadius: 6, padding: 16 }}>
          <b>AI历史对话</b>
          <ul style={{ margin: '10px 0 0 0', padding: 0, listStyle: 'none', fontSize: 14 }}>
            <li>2025-06-07 “如何用AI提升创新效率？”</li>
            <li>2025-06-06 “请帮我生成一个创新项目计划”</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // 区块切换
  const renderSection = () => {
    switch (active) {
      case 'cases':
        return renderCases();
      case 'incubation':
        return renderIncubation();
      case 'sharing':
        return renderSharing();
      case 'tools':
        return renderTools();
      case 'ai':
        return renderAI();
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>创新实践模块</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        {sections.map(sec => (
          <button
            key={sec.key}
            onClick={() => setActive(sec.key)}
            style={{ fontWeight: active === sec.key ? 'bold' : undefined }}
          >
            {sec.label}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, minHeight: 200 }}>
        {renderSection()}
      </div>
    </div>
  );
};

export default InnovationPractice;
