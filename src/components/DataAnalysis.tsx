// 数据分析模块
import React, { useState } from 'react';
// 如需更美观可引入 ECharts/Ant Design Charts，现用简单SVG和表格占位

interface OverviewStat {
  label: string;
  value: number;
  unit?: string;
}

const overviewStats: OverviewStat[] = [
  { label: '学员总数', value: 128 },
  { label: '项目数', value: 12 },
  { label: '课程数', value: 36 },
  { label: '积分总量', value: 5420 },
  { label: '活跃度', value: 87, unit: '%' },
];

const trendData = [
  { date: '2025-06-01', students: 100, points: 300 },
  { date: '2025-06-02', students: 105, points: 350 },
  { date: '2025-06-03', students: 110, points: 400 },
  { date: '2025-06-04', students: 115, points: 420 },
  { date: '2025-06-05', students: 120, points: 480 },
  { date: '2025-06-06', students: 125, points: 500 },
  { date: '2025-06-07', students: 128, points: 542 },
];

const detailTable = [
  { name: '张三', group: 'A组', points: 120, signRate: '100%', homework: '已交' },
  { name: '李四', group: 'B组', points: 80, signRate: '80%', homework: '未交' },
  { name: '王五', group: 'A组', points: 60, signRate: '60%', homework: '已交' },
];

const DataAnalysis: React.FC = () => {
  const [trendType, setTrendType] = useState<'students' | 'points'>('students');

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ color: '#1769aa', marginBottom: 24 }}>数据分析中心</h2>
      {/* 数据总览卡片区 */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        {overviewStats.map(stat => (
          <div key={stat.label} style={{ background: '#f4f8fb', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,40,80,0.04)', padding: 24, minWidth: 120, textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#1769aa' }}>{stat.value}{stat.unit || ''}</div>
            <div style={{ color: '#888', fontSize: 15 }}>{stat.label}</div>
          </div>
        ))}
      </div>
      {/* 趋势图表区（简单SVG折线图/柱状图占位） */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
          <b>趋势分析：</b>
          <button onClick={() => setTrendType('students')} style={{ fontWeight: trendType === 'students' ? 'bold' : undefined }}>学员增长</button>
          <button onClick={() => setTrendType('points')} style={{ fontWeight: trendType === 'points' ? 'bold' : undefined }}>积分变化</button>
        </div>
        <svg width="420" height="120" style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,40,80,0.04)' }}>
          {/* 简单折线图/柱状图 */}
          {trendType === 'students' && trendData.map((d, i, arr) => i > 0 && (
            <line key={i} x1={40 + (i - 1) * 60} y1={100 - arr[i - 1].students / 2} x2={40 + i * 60} y2={100 - d.students / 2} stroke="#1769aa" strokeWidth={2} />
          ))}
          {trendType === 'points' && trendData.map((d, i, arr) => i > 0 && (
            <line key={i} x1={40 + (i - 1) * 60} y1={100 - arr[i - 1].points / 10} x2={40 + i * 60} y2={100 - d.points / 10} stroke="#52c41a" strokeWidth={2} />
          ))}
          {/* X轴标签 */}
          {trendData.map((d, i) => (
            <text key={d.date} x={40 + i * 60} y={115} fontSize={10} textAnchor="middle">{d.date.slice(5)}</text>
          ))}
        </svg>
      </div>
      {/* 明细表格区 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,40,80,0.04)', padding: 16 }}>
        <h4 style={{ color: '#1769aa' }}>学员明细</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f4f8fb' }}>
              <th>姓名</th><th>分组</th><th>积分</th><th>签到率</th><th>作业</th>
            </tr>
          </thead>
          <tbody>
            {detailTable.map(row => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.group}</td>
                <td>{row.points}</td>
                <td>{row.signRate}</td>
                <td>{row.homework}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 智能报告与导出功能预留 */}
      <div style={{ marginTop: 32, color: '#888' }}>
        <b>智能报告：</b> <span>（后续可接入AI自动生成分析结论与建议）</span>
        <button style={{ marginLeft: 16 }} disabled>导出数据</button>
      </div>
    </div>
  );
};

export default DataAnalysis;
