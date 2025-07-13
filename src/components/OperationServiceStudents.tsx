// 学员管理子模块
import React, { useState } from 'react';

export interface Student {
  id: string;
  name: string;
  group?: string;
  email?: string;
  phone?: string;
  status?: string; // 在读/已结业/黑名单等
  tags?: string[];
}

const initialStudents: Student[] = [
  { id: '1', name: '张三', group: 'A组', email: 'zhangsan@example.com', phone: '13800000001', status: '在读', tags: ['骨干'] },
  { id: '2', name: '李四', group: 'B组', email: 'lisi@example.com', phone: '13800000002', status: '已结业', tags: ['新晋'] },
];

const OperationServiceStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState<Student>({ id: '', name: '' });

  const filtered = students.filter(s => s.name.includes(search) || (s.email && s.email.includes(search)));

  const handleEdit = (student: Student) => {
    setEditing(student);
    setForm(student);
  };
  const handleDelete = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };
  const handleSave = () => {
    if (editing) {
      setStudents(students.map(s => s.id === editing.id ? { ...form } : s));
    } else {
      setStudents([...students, { ...form, id: Date.now().toString() }]);
    }
    setEditing(null);
    setForm({ id: '', name: '' });
  };
  const handleAdd = () => {
    setEditing(null);
    setForm({ id: '', name: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <input
          placeholder="搜索学员姓名/邮箱"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <div>
          <button onClick={handleAdd}>添加学员</button>
          <button disabled>批量导入</button>
          <button disabled>导出</button>
        </div>
      </div>
      <table className="student-table">
        <thead>
          <tr>
            <th>姓名</th>
            <th>分组</th>
            <th>邮箱</th>
            <th>电话</th>
            <th>状态</th>
            <th>标签</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.group || '-'}</td>
              <td>{s.email || '-'}</td>
              <td>{s.phone || '-'}</td>
              <td>{s.status || '-'}</td>
              <td>{s.tags?.join(',') || '-'}</td>
              <td>
                <button onClick={() => handleEdit(s)}>编辑</button>
                <button onClick={() => handleDelete(s.id)}>删除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(editing !== null || form.name) && (
        <div className="student-form-modal">
          <h5>{editing ? '编辑学员' : '添加学员'}</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input placeholder="姓名" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input placeholder="分组" value={form.group || ''} onChange={e => setForm({ ...form, group: e.target.value })} />
            <input placeholder="邮箱" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input placeholder="电话" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} />
            <input placeholder="状态" value={form.status || ''} onChange={e => setForm({ ...form, status: e.target.value })} />
            <input placeholder="标签（逗号分隔）" value={form.tags?.join(',') || ''} onChange={e => setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} />
            <div>
              <button onClick={handleSave}>保存</button>
              <button onClick={() => { setEditing(null); setForm({ id: '', name: '' }); }}>取消</button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .student-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        .student-table th, .student-table td { border: 1px solid #e0e6ed; padding: 6px 8px; text-align: center; }
        .student-table th { background: #f4f8fb; }
        .student-form-modal { background: #fff; border: 1px solid #e0e6ed; padding: 16px; margin-top: 16px; max-width: 400px; }
      `}</style>
    </div>
  );
};

export default OperationServiceStudents;
