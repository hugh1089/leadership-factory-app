// AI智能模块
import React, { useState } from 'react';

const aiRoles = [
  { key: 'coach', label: '领导力教练' },
  { key: 'consultant', label: '学习顾问' },
  { key: 'analyst', label: '数据分析师' },
];

const examplePrompts = [
  '请帮我生成一个领导力课程大纲',
  '分析本月学员活跃度趋势',
  '推荐适合新晋管理者的学习路径',
  '给出提升团队凝聚力的建议',
];

const mockAIReply = (role: string, input: string) => {
  if (role === 'coach') return '【领导力教练】建议：' + input + ' ...（此处为AI模拟回复，可对接大模型API）';
  if (role === 'consultant') return '【学习顾问】为您生成内容：' + input + ' ...（此处为AI模拟回复）';
  if (role === 'analyst') return '【数据分析师】分析结果：' + input + ' ...（此处为AI模拟回复）';
  return 'AI回复：' + input;
};

const AISmart: React.FC = () => {
  const [role, setRole] = useState('coach');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ from: 'user' | 'ai'; text: string }[]>([]);

  const handleSend = () => {
    if (!input.trim()) return;
    setHistory([...history, { from: 'user', text: input }]);
    setTimeout(() => {
      setHistory(h => [...h, { from: 'ai', text: mockAIReply(role, input) }]);
    }, 600);
    setInput('');
  };

  const handlePrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div style={{ padding: 24, maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ color: '#1769aa', marginBottom: 24 }}>AI智能中心</h2>
      {/* 角色切换 */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <b>AI角色：</b>
        {aiRoles.map(r => (
          <button key={r.key} onClick={() => setRole(r.key)} style={{ fontWeight: r.key === role ? 'bold' : undefined }}>{r.label}</button>
        ))}
      </div>
      {/* 对话区 */}
      <div style={{ background: '#f4f8fb', borderRadius: 8, minHeight: 220, padding: 16, marginBottom: 16, maxHeight: 320, overflowY: 'auto' }}>
        {history.length === 0 && <div style={{ color: '#aaa' }}>欢迎使用AI智能助手，可输入问题或选择下方示例体验。</div>}
        {history.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.from === 'user' ? 'right' : 'left', margin: '8px 0' }}>
            <span style={{ display: 'inline-block', background: msg.from === 'user' ? '#1769aa' : '#fff', color: msg.from === 'user' ? '#fff' : '#333', borderRadius: 8, padding: '6px 14px', maxWidth: 420 }}>{msg.text}</span>
          </div>
        ))}
      </div>
      {/* 输入区 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          placeholder="请输入您的问题或需求..."
          style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #e0e6ed' }}
        />
        <button onClick={handleSend} style={{ padding: '8px 24px' }}>发送</button>
      </div>
      {/* 示例提示区 */}
      <div style={{ color: '#888', marginBottom: 8 }}>示例：</div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {examplePrompts.map(p => (
          <button key={p} onClick={() => handlePrompt(p)} style={{ background: '#e3f0fc', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}>{p}</button>
        ))}
      </div>
      {/* 内容生成与智能推荐预留区 */}
      <div style={{ marginTop: 32, color: '#888' }}>
        <b>内容生成与智能推荐：</b> <span>（后续可扩展课程大纲、案例、测评等一键生成工具，支持AI推荐与分析）</span>
      </div>
    </div>
  );
};

export default AISmart;
