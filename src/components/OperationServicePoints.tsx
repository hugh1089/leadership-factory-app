// 激励积分子模块
import React, { useState } from 'react';

export interface PointRecord {
  id: string;
  studentId: string;
  studentName?: string;
  type: string; // 获得/消耗类型
  amount: number;
  time: string;
  remark?: string;
}

const initialPoints: PointRecord[] = [
  { id: '1', studentId: '1', studentName: '张三', type: '获得-签到', amount: 10, time: '2025-06-07 09:00', remark: '每日签到' },
  { id: '2', studentId: '2', studentName: '李四', type: '获得-作业', amount: 20, time: '2025-06-07 10:00', remark: '作业优秀' },
  { id: '3', studentId: '1', studentName: '张三', type: '消耗-兑换', amount: -15, time: '2025-06-07 11:00', remark: '兑换礼品' },
];

const OperationServicePoints: React.FC = () => {
  const [points, setPoints] = useState<PointRecord[]>(initialPoints);
  const [search, setSearch] = useState('');
  const [showRank, setShowRank] = useState(false);
  const [form, setForm] = useState<{ studentName: string; amount: number; remark: string }>({ studentName: '', amount: 0, remark: '' });

  const filtered = points.filter(p => p.studentName?.includes(search) || p.type.includes(search));

  // 计算排行榜
  const rank = Object.entries(points.reduce((acc, cur) => {
    acc[cur.studentName || '未知'] = (acc[cur.studentName || '未知'] || 0) + cur.amount;
    return acc;
  }, {} as Record<string, number>)).sort((a, b) => b[1] - a[1]);

  // 新增积分
  const handleAdd = () => {
    if (!form.studentName || !form.amount) return;
    setPoints([
      ...points,
      { id: Date.now().toString(), studentId: '', studentName: form.studentName, type: form.amount > 0 ? '获得-手动' : '消耗-手动', amount: form.amount, time: new Date().toLocaleString(), remark: form.remark }
    ]);
    setForm({ studentName: '', amount: 0, remark: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <input
          placeholder="搜索学员/类型"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <div>
          <button onClick={() => setShowRank(r => !r)}>{showRank ? '查看明细' : '查看排行榜'}</button>
          <button disabled>积分规则</button>
          <button disabled>积分兑换</button>
        </div>
      </div>
      {showRank ? (
        <table className="points-table">
          <thead>
            <tr><th>排名</th><th>学员</th><th>总积分</th></tr>
          </thead>
          <tbody>
            {rank.map(([name, total], idx) => (
              <tr key={name}>
                <td>{idx + 1}</td>
                <td>{name}</td>
                <td>{total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <table className="points-table">
            <thead>
              <tr>
                <th>学员</th>
                <th>类型</th>
                <th>积分变动</th>
                <th>时间</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>{p.studentName || '-'}</td>
                  <td>{p.type}</td>
                  <td style={{ color: p.amount > 0 ? '#52c41a' : '#f5222d' }}>{p.amount > 0 ? '+' : ''}{p.amount}</td>
                  <td>{p.time}</td>
                  <td>{p.remark || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="points-form" style={{ marginTop: 16 }}>
            <h5>手动调整积分</h5>
            <input placeholder="学员姓名" value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} />
            <input type="number" placeholder="积分（正为获得，负为消耗）" value={form.amount} onChange={e => setForm({ ...form, amount: Number(e.target.value) })} />
            <input placeholder="备注" value={form.remark} onChange={e => setForm({ ...form, remark: e.target.value })} />
            <button onClick={handleAdd}>保存</button>
          </div>
        </>
      )}
      <style>{`
        .points-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        .points-table th, .points-table td { border: 1px solid #e0e6ed; padding: 6px 8px; text-align: center; }
        .points-table th { background: #f4f8fb; }
        .points-form input { margin-right: 8px; margin-bottom: 4px; }
      `}</style>
    </div>
  );
};

export default OperationServicePoints;
