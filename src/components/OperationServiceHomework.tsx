// 作业成果子模块
import React, { useState } from 'react';

export interface Homework {
  id: string;
  title: string;
  studentId: string;
  studentName?: string;
  fileUrl?: string;
  score?: number;
  comment?: string;
  status?: '未提交' | '已提交' | '已批阅';
}

const initialHomework: Homework[] = [
  { id: '1', title: '领导力案例分析', studentId: '1', studentName: '张三', status: '已提交', fileUrl: '', score: undefined, comment: '' },
  { id: '2', title: '团队管理心得', studentId: '2', studentName: '李四', status: '未提交' },
];

const OperationServiceHomework: React.FC = () => {
  const [homeworks, setHomeworks] = useState<Homework[]>(initialHomework);
  const [search, setSearch] = useState('');
  const [grading, setGrading] = useState<Homework | null>(null);
  const [score, setScore] = useState<number | undefined>();
  const [comment, setComment] = useState('');

  const filtered = homeworks.filter(h => h.title.includes(search) || h.studentName?.includes(search));

  // 模拟上传作业
  const handleUpload = (id: string) => {
    setHomeworks(homeworks.map(h => h.id === id ? { ...h, status: '已提交', fileUrl: '作业文件.pdf' } : h));
  };
  // 批阅作业
  const handleGrade = (hw: Homework) => {
    setGrading(hw);
    setScore(hw.score);
    setComment(hw.comment || '');
  };
  const handleSaveGrade = () => {
    if (grading) {
      setHomeworks(homeworks.map(h => h.id === grading.id ? { ...h, score, comment, status: '已批阅' } : h));
      setGrading(null);
      setScore(undefined);
      setComment('');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <input
          placeholder="搜索作业/学员"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <div>
          <button disabled>批量导出</button>
        </div>
      </div>
      <table className="homework-table">
        <thead>
          <tr>
            <th>作业标题</th>
            <th>学员姓名</th>
            <th>状态</th>
            <th>作业文件</th>
            <th>分数</th>
            <th>评语</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(hw => (
            <tr key={hw.id}>
              <td>{hw.title}</td>
              <td>{hw.studentName || '-'}</td>
              <td>{hw.status || '-'}</td>
              <td>
                {hw.status === '已提交' || hw.status === '已批阅' ? (
                  <span>
                    <a href="#" onClick={e => { e.preventDefault(); alert('模拟下载：' + (hw.fileUrl || '无文件')); }}>下载</a>
                  </span>
                ) : (
                  <button onClick={() => handleUpload(hw.id)}>上传</button>
                )}
              </td>
              <td>{hw.score !== undefined ? hw.score : '-'}</td>
              <td>{hw.comment || '-'}</td>
              <td>
                {hw.status === '已提交' && <button onClick={() => handleGrade(hw)}>批阅</button>}
                {hw.status === '已批阅' && <span style={{ color: '#1890ff' }}>已批阅</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {grading && (
        <div className="grade-modal">
          <h5>批阅作业 - {grading.title}（{grading.studentName}）</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input type="number" placeholder="分数" value={score ?? ''} onChange={e => setScore(Number(e.target.value))} />
            <textarea placeholder="评语" value={comment} onChange={e => setComment(e.target.value)} />
            <div>
              <button onClick={handleSaveGrade}>保存</button>
              <button onClick={() => setGrading(null)}>取消</button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .homework-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        .homework-table th, .homework-table td { border: 1px solid #e0e6ed; padding: 6px 8px; text-align: center; }
        .homework-table th { background: #f4f8fb; }
        .grade-modal { background: #fff; border: 1px solid #e0e6ed; padding: 16px; margin-top: 16px; max-width: 400px; }
      `}</style>
    </div>
  );
};

export default OperationServiceHomework;
