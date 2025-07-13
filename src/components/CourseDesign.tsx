import React, { useState } from 'react';
import './CourseDesign.css';

const courseTypes = [
  '通用能力', '管理技能', '专业知识', '领导力', '创新创业', '行动学习', '混合式课程', '定制课程',
];

const courseTemplates = [
  { name: '课程方案模板', url: '#' },
  { name: '课程大纲模板', url: '#' },
  { name: '课件模板', url: '#' },
];

const CourseDesign: React.FC = () => {
  const [courseName, setCourseName] = useState('');
  const [courseType, setCourseType] = useState('');
  const [target, setTarget] = useState('');
  const [outline, setOutline] = useState('');
  const [materials, setMaterials] = useState('');
  const [highlights, setHighlights] = useState('');
  const [outputs, setOutputs] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [duration, setDuration] = useState('');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles([...files, ...Array.from(e.target.files)]);
  };

  // 按钮功能占位
  const handleSave = () => {
    alert('保存成功（演示功能）');
  };
  const handleExport = () => {
    alert('导出课程方案功能开发中');
  };

  return (
    <div className="course-design-container">
      <h2 className="course-design-title">课程设计与管理</h2>
      <section className="course-section">
        <h3>1. 课程基本信息</h3>
        <div className="course-row">
          <label>课程名称：</label>
          <input value={courseName} onChange={e => setCourseName(e.target.value)} placeholder="请输入课程名称" />
          <label style={{marginLeft:16}}>课程类型：</label>
          <select value={courseType} onChange={e => setCourseType(e.target.value)}>
            <option value="">请选择</option>
            {courseTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <label style={{marginLeft:16}}>课程时长：</label>
          <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="如：2天/12学时/3小时" style={{width:120}} />
        </div>
      </section>
      <section className="course-section">
        <h3>2. 目标与对象</h3>
        <div className="course-row">
          <label>课程目标：</label>
          <textarea value={target} onChange={e => setTarget(e.target.value)} placeholder="如：提升管理者沟通能力，解决实际业务问题等" rows={2} />
        </div>
      </section>
      <section className="course-section">
        <h3>3. 课程大纲</h3>
        <div className="course-row">
          <label>课程大纲：</label>
          <textarea value={outline} onChange={e => setOutline(e.target.value)} placeholder={
            `示例：\n一、管理者角色认知\n  1.1 管理的本质\n  1.2 管理者的定位与职责\n二、沟通与影响\n  2.1 沟通的基本原则\n  2.2 影响力提升技巧\n...`
          } rows={5} />
        </div>
      </section>
      <section className="course-section">
        <h3>4. 课件与资料</h3>
        <div className="course-row">
          <label>课件/资料说明：</label>
          <textarea value={materials} onChange={e => setMaterials(e.target.value)} placeholder="如PPT、案例、视频、练习等" rows={2} />
        </div>
        <div className="course-row">
          <label>上传课件/资料：</label>
          <input type="file" multiple onChange={handleFile} />
          <ul className="file-list">
            {files.map((f, i) => <li key={i}>{f.name}</li>)}
          </ul>
        </div>
      </section>
      <section className="course-section">
        <h3>5. 课程产出与亮点</h3>
        <div className="course-row">
          <label>课程产出：</label>
          <textarea value={outputs} onChange={e => setOutputs(e.target.value)} placeholder="如：学员作业、案例分析、行动计划、课后反思等" rows={2} />
        </div>
        <div className="course-row">
          <label>课程亮点：</label>
          <textarea value={highlights} onChange={e => setHighlights(e.target.value)} placeholder="如：案例驱动、互动体验、业务场景定制等" rows={2} />
        </div>
      </section>
      <section className="course-section">
        <h3>6. 模板下载</h3>
        <div className="course-row">
          <label>可下载模板：</label>
          <ul className="template-list">
            {courseTemplates.map(t => <li key={t.name}><a href={t.url} download>{t.name}</a></li>)}
          </ul>
        </div>
      </section>
      <div className="course-actions">
        <button className="business-btn" type="button" onClick={handleSave}>保存课程</button>
        <button className="business-btn business-btn-secondary" type="button" onClick={handleExport}>导出方案</button>
      </div>
    </div>
  );
};

export default CourseDesign;
