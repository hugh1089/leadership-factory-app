import React, { useState } from 'react';
import './LearningProject.css';

const projectTypes = [
  '领导力提升', '专项能力', '行动学习', '混合式学习', '定制项目',
];

const templates = [
  { name: '项目策划书模板', url: '#' },
  { name: '运营方案模板', url: '#' },
  { name: '复盘报告模板', url: '#' },
];

// 课程库和师资库模拟数据（后续可与数据库/课程库模块联动）
const courseLibrary = [
  { id: 1, name: '战略管理', desc: '系统掌握企业战略制定与落地方法。' },
  { id: 2, name: '创新思维', desc: '提升创新能力，激发组织活力。' },
  { id: 3, name: '团队领导力', desc: '打造高绩效团队，提升领导力。' },
  // ...可扩展...
];
const facultyLibrary = [
  { id: 1, name: '王教授', intro: '知名战略管理专家，实战经验丰富。' },
  { id: 2, name: '李教练', intro: '领导力教练，专注团队发展。' },
  // ...可扩展...
];

const LearningProject: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [department, setDepartment] = useState('');
  const [owner, setOwner] = useState('');
  const [cycle, setCycle] = useState('');
  const [participants, setParticipants] = useState('');
  const [background, setBackground] = useState('');
  const [goals, setGoals] = useState('');
  const [milestones, setMilestones] = useState('');
  const [learningPath, setLearningPath] = useState('');
  const [courseIntro, setCourseIntro] = useState('');
  const [facultyIntro, setFacultyIntro] = useState('');
  const [outputs, setOutputs] = useState('');
  const [highlights, setHighlights] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [courses, setCourses] = useState<{name:string,desc:string}[]>([]);
  const [courseName, setCourseName] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [faculty, setFaculty] = useState<{name:string,intro:string}[]>([]);
  const [facultyName, setFacultyName] = useState('');
  const [facultyIntroInput, setFacultyIntroInput] = useState('');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles([...files, ...Array.from(e.target.files)]);
  };

  // 按钮功能占位
  const handleSave = () => {
    alert('保存成功（演示功能）');
  };
  const handleExport = () => {
    alert('导出项目方案功能开发中');
  };

  return (
    <div className="learning-project-container">
      <h2 className="learning-project-title">学习项目策划与管理</h2>
      <section className="project-section">
        <h3>1. 项目基本信息</h3>
        <div className="project-row">
          <label>项目名称：</label>
          <input value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="请输入项目名称" />
          <label style={{marginLeft:16}}>项目类型：</label>
          <select value={projectType} onChange={e => setProjectType(e.target.value)}>
            <option value="">请选择</option>
            {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="project-row">
          <label>发起部门：</label>
          <input value={department} onChange={e => setDepartment(e.target.value)} placeholder="如：人力资源部" />
          <label style={{marginLeft:16}}>负责人：</label>
          <input value={owner} onChange={e => setOwner(e.target.value)} placeholder="如：张三" />
        </div>
        <div className="project-row">
          <label>项目周期：</label>
          <input value={cycle} onChange={e => setCycle(e.target.value)} placeholder="如：2025.07-2025.12" />
          <label style={{marginLeft:16}}>参与对象：</label>
          <input value={participants} onChange={e => setParticipants(e.target.value)} placeholder="如：中高层管理者" />
        </div>
      </section>
      <section className="project-section">
        <h3>2. 项目策划与目标</h3>
        <div className="project-row">
          <label>项目背景：</label>
          <textarea value={background} onChange={e => setBackground(e.target.value)} placeholder="可自动引用前序模块分析结果，支持编辑" rows={2} />
        </div>
        <div className="project-row">
          <label>项目目标：</label>
          <textarea value={goals} onChange={e => setGoals(e.target.value)} placeholder="业务目标+学习目标，支持标签+自定义" rows={2} />
        </div>
        <div className="project-row">
          <label>关键成果/里程碑：</label>
          <textarea value={milestones} onChange={e => setMilestones(e.target.value)} placeholder="可分阶段设定" rows={2} />
        </div>
      </section>
      <section className="project-section">
        <h3>3. 项目内容与路径</h3>
        <div className="project-row">
          <label>学习路径设计：</label>
          <textarea value={learningPath} onChange={e => setLearningPath(e.target.value)} placeholder="如：线上课程+线下工作坊+行动学习+教练辅导等" rows={2} />
        </div>
        <div className="project-row">
          <label>课程介绍：</label>
          <select onChange={e => {
            const c = courseLibrary.find(c => c.name === e.target.value);
            if (c) setCourses([...courses, { name: c.name, desc: c.desc }]);
          }} defaultValue="">
            <option value="">从课程库选择</option>
            {courseLibrary.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <input value={courseName} onChange={e => setCourseName(e.target.value)} placeholder="课程名称" style={{width:120}} />
          <input value={courseDesc} onChange={e => setCourseDesc(e.target.value)} placeholder="课程简介" style={{width:220}} />
          <button type="button" className="business-btn" style={{padding:'4px 12px',fontSize:'0.95rem'}} onClick={() => {
            if(courseName) setCourses([...courses, { name: courseName, desc: courseDesc }]);
            setCourseName(''); setCourseDesc('');
          }}>新增</button>
        </div>
        <ul className="course-list">
          {courses.map((c,i) => <li key={i}><b>{c.name}</b>：{c.desc}</li>)}
        </ul>
      </section>
      <section className="project-section">
        <h3>4. 项目产出与亮点</h3>
        <div className="project-row">
          <label>项目产出：</label>
          <textarea value={outputs} onChange={e => setOutputs(e.target.value)} placeholder="如：学员作业、项目成果、案例沉淀等" rows={2} />
        </div>
        <div className="project-row">
          <label>项目亮点：</label>
          <textarea value={highlights} onChange={e => setHighlights(e.target.value)} placeholder="如：创新模式、业务价值、学员反馈等" rows={2} />
        </div>
      </section>
      <section className="project-section">
        <h3>5. 文件管理与模板下载</h3>
        <div className="project-row">
          <label>可下载模板：</label>
          <ul className="template-list">
            {templates.map(t => <li key={t.name}><a href={t.url} download>{t.name}</a></li>)}
          </ul>
          <span className="template-tip">如需上传模板文件，请联系管理员或在后续后台管理模块维护。</span>
        </div>
        <div className="project-row">
          <label>上传项目相关文件：</label>
          <input type="file" multiple onChange={handleFile} />
          <ul className="file-list">
            {files.map((f, i) => <li key={i}>{f.name}</li>)}
          </ul>
        </div>
      </section>
      <section className="project-section">
        <h3>6. 项目全景图</h3>
        <div className="project-panorama-tip">（可视化项目流程、关键节点、课程与师资分布，后续可扩展为流程图/甘特图/大屏等）</div>
        <div className="project-panorama-placeholder">[项目全景图占位区]</div>
      </section>
      <div className="project-actions">
        <button className="business-btn" type="button" onClick={handleSave}>保存项目</button>
        <button className="business-btn business-btn-secondary" type="button" onClick={handleExport}>导出方案</button>
      </div>
    </div>
  );
};

export default LearningProject;
