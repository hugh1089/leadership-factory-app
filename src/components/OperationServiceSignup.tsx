// 报名签到子模块
import React, { useState } from 'react';

export interface SignupRecord {
  id: string;
  studentId: string;
  studentName?: string;
  event: string;
  status: '未签到' | '已签到';
  time?: string;
}

const initialRecords: SignupRecord[] = [
  { id: '1', studentId: '1', studentName: '张三', event: '领导力训练营', status: '未签到' },
  { id: '2', studentId: '2', studentName: '李四', event: '领导力训练营', status: '已签到', time: '2025-06-07 09:00' },
];

const OperationServiceSignup: React.FC = () => {
  const [records, setRecords] = useState<SignupRecord[]>(initialRecords);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = records.filter(r => r.studentName?.includes(search) || r.event.includes(search));

  const handleCheck = (id: string) => {
    setSelected(sel => sel.includes(id) ? sel.filter(sid => sid !== id) : [...sel, id]);
  };
  const handleSign = (id: string) => {
    setRecords(records.map(r => r.id === id ? { ...r, status: '已签到', time: new Date().toLocaleString() } : r));
  };
  const handleBatchSign = () => {
    setRecords(records.map(r => selected.includes(r.id) ? { ...r, status: '已签到', time: new Date().toLocaleString() } : r));
    setSelected([]);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <input
          placeholder="搜索学员姓名/活动"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <div>
          <button onClick={handleBatchSign} disabled={selected.length === 0}>批量签到</button>
          <button disabled>二维码签到</button>
          <button disabled>导出</button>
        </div>
      </div>
      <table className="signup-table">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={e => setSelected(e.target.checked ? filtered.map(r => r.id) : [])} /></th>
            <th>学员姓名</th>
            <th>活动/课程</th>
            <th>签到状态</th>
            <th>签到时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(r => (
            <tr key={r.id}>
              <td><input type="checkbox" checked={selected.includes(r.id)} onChange={() => handleCheck(r.id)} /></td>
              <td>{r.studentName || '-'}</td>
              <td>{r.event}</td>
              <td>{r.status}</td>
              <td>{r.time || '-'}</td>
              <td>
                {r.status === '未签到' && <button onClick={() => handleSign(r.id)}>手动签到</button>}
                {r.status === '已签到' && <span style={{ color: '#1890ff' }}>已签到</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`
        .signup-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        .signup-table th, .signup-table td { border: 1px solid #e0e6ed; padding: 6px 8px; text-align: center; }
        .signup-table th { background: #f4f8fb; }
      `}</style>
    </div>
  );
};

export default OperationServiceSignup;
