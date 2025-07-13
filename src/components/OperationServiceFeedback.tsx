// 反馈服务子模块
import React, { useState } from 'react';

export interface Feedback {
  id: string;
  studentId: string;
  studentName?: string;
  type: string; // 问卷/建议/评价等
  content: string;
  createdAt: string;
  status?: string;
}

const initialFeedback: Feedback[] = [
  { id: '1', studentId: '1', studentName: '张三', type: '建议', content: '希望增加案例讨论环节。', createdAt: '2025-06-07 09:00', status: '已处理' },
  { id: '2', studentId: '2', studentName: '李四', type: '评价', content: '课程内容很实用，讲师很专业。', createdAt: '2025-06-07 10:00', status: '未处理' },
];

const feedbackTypes = ['全部', '问卷', '建议', '评价'];

const OperationServiceFeedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedback);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('全部');
  const [showDetail, setShowDetail] = useState<Feedback | null>(null);
  const [form, setForm] = useState<{ studentName: string; type: string; content: string }>({ studentName: '', type: '建议', content: '' });

  const filtered = feedbacks.filter(f =>
    (type === '全部' || f.type === type) &&
    (f.studentName?.includes(search) || f.content.includes(search))
  );

  // 新增反馈
  const handleAdd = () => {
    if (!form.studentName || !form.content) return;
    setFeedbacks([
      ...feedbacks,
      { id: Date.now().toString(), studentId: '', studentName: form.studentName, type: form.type, content: form.content, createdAt: new Date().toLocaleString(), status: '未处理' }
    ]);
    setForm({ studentName: '', type: '建议', content: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <input
          placeholder="搜索学员/内容"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <div>
          {feedbackTypes.map(t => (
            <button key={t} onClick={() => setType(t)} style={{ fontWeight: t === type ? 'bold' : undefined }}>{t}</button>
          ))}
          <button disabled>问卷统计</button>
        </div>
      </div>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>学员</th>
            <th>类型</th>
            <th>内容</th>
            <th>时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(f => (
            <tr key={f.id}>
              <td>{f.studentName || '-'}</td>
              <td>{f.type}</td>
              <td>{f.content.length > 16 ? f.content.slice(0, 16) + '...' : f.content}</td>
              <td>{f.createdAt}</td>
              <td>{f.status || '-'}</td>
              <td><button onClick={() => setShowDetail(f)}>查看</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDetail && (
        <div className="feedback-detail-modal">
          <h5>反馈详情</h5>
          <div><b>学员：</b>{showDetail.studentName}</div>
          <div><b>类型：</b>{showDetail.type}</div>
          <div><b>内容：</b>{showDetail.content}</div>
          <div><b>时间：</b>{showDetail.createdAt}</div>
          <div><b>状态：</b>{showDetail.status}</div>
          <button onClick={() => setShowDetail(null)}>关闭</button>
        </div>
      )}
      <div className="feedback-form" style={{ marginTop: 16 }}>
        <h5>新增反馈</h5>
        <input placeholder="学员姓名" value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} />
        <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
          <option value="建议">建议</option>
          <option value="评价">评价</option>
          <option value="问卷">问卷</option>
        </select>
        <input placeholder="内容" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} style={{ width: 300 }} />
        <button onClick={handleAdd}>提交</button>
      </div>
      <style>{`
        .feedback-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        .feedback-table th, .feedback-table td { border: 1px solid #e0e6ed; padding: 6px 8px; text-align: center; }
        .feedback-table th { background: #f4f8fb; }
        .feedback-detail-modal { background: #fff; border: 1px solid #e0e6ed; padding: 16px; margin-top: 16px; max-width: 400px; }
        .feedback-form input, .feedback-form select { margin-right: 8px; margin-bottom: 4px; }
      `}</style>
    </div>
  );
};

export default OperationServiceFeedback;
