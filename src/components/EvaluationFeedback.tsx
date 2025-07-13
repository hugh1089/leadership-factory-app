// 评估反馈模块（重建版，最小骨架+题库对象，确保无语法错误）
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

// 统一题型定义
interface BaseQ { id: number; text: string; open?: boolean; options?: string[]; dimension?: string; }
// 修复：补充Eval360Q类型声明
interface Eval360Q extends BaseQ { dimension: string; }
type EvalType = '360' | 'kirkpatrick' | 'roi' | 'survey' | 'course';
type EvalRole = 'student' | 'manager' | 'peer' | 'lecturer';

// 360度评估题库
const eval360Questions: Record<EvalRole, Eval360Q[]> = {
  student: [
    { id: 1, text: '我能主动承担团队任务并高效完成', dimension: '责任心' },
    { id: 2, text: '我能积极与同事沟通协作', dimension: '团队协作' },
    { id: 3, text: '我能主动学习并持续提升自我', dimension: '学习力' },
    { id: 4, text: '我能在压力下保持积极心态', dimension: '抗压能力' },
    { id: 5, text: '我能根据反馈及时调整行为', dimension: '自我反思' },
    { id: 6, text: '我能主动提出改进建议', dimension: '创新力' },
    { id: 7, text: '我能有效管理时间与优先级', dimension: '自我管理' },
    { id: 8, text: '我能将所学应用于实际工作', dimension: '应用能力' },
    { id: 9, text: '请简述一次你主动改进团队流程的经历', dimension: '开放', open: true }
  ],
  manager: [
    { id: 11, text: '该学员能主动承担责任并高效完成任务', dimension: '责任心' },
    { id: 12, text: '该学员具备良好的团队协作与沟通能力', dimension: '团队协作' },
    { id: 13, text: '该学员能主动学习并带动他人进步', dimension: '学习力' },
    { id: 14, text: '该学员在压力下能保持高效执行', dimension: '抗压能力' },
    { id: 15, text: '该学员能根据反馈持续优化表现', dimension: '自我反思' },
    { id: 16, text: '该学员能主动提出创新建议', dimension: '创新力' },
    { id: 17, text: '该学员能有效管理时间与优先级', dimension: '自我管理' },
    { id: 18, text: '该学员能将所学应用于实际工作', dimension: '应用能力' },
    { id: 19, text: '请举例说明该学员在团队中的突出表现', dimension: '开放', open: true }
  ],
  peer: [
    { id: 21, text: '该同事乐于助人，积极协作', dimension: '团队协作' },
    { id: 22, text: '该同事沟通顺畅，能有效表达观点', dimension: '沟通影响' },
    { id: 23, text: '该同事能主动学习新知识', dimension: '学习力' },
    { id: 24, text: '该同事面对压力能保持冷静', dimension: '抗压能力' },
    { id: 25, text: '该同事能虚心接受建议', dimension: '自我反思' },
    { id: 26, text: '该同事能主动提出创新想法', dimension: '创新力' },
    { id: 27, text: '该同事能有效管理时间与优先级', dimension: '自我管理' },
    { id: 28, text: '该同事能将所学应用于实际工作', dimension: '应用能力' },
    { id: 29, text: '请描述一次你与该同事高效协作的经历', dimension: '开放', open: true }
  ],
  lecturer: [
    { id: 31, text: '该学员参与度高，积极互动', dimension: '参与度' },
    { id: 32, text: '该学员能提出有价值的问题', dimension: '思辨力' },
    { id: 33, text: '该学员能将所学应用于实际', dimension: '应用能力' },
    { id: 34, text: '该学员尊重讲师与同伴', dimension: '职业素养' },
    { id: 35, text: '该学员能及时完成作业与反馈', dimension: '执行力' },
    { id: 36, text: '该学员能主动提出创新建议', dimension: '创新力' },
    { id: 37, text: '该学员能有效管理时间与优先级', dimension: '自我管理' },
    { id: 38, text: '该学员在团队中有积极影响', dimension: '团队影响力' },
    { id: 39, text: '请描述该学员在课堂上的亮点表现', dimension: '开放', open: true }
  ]
};

// 柯氏四级评估题库（每级8题+开放题）
const kirkpatrickLevels = [
  { key: 'reaction', label: '一级反应' },
  { key: 'learning', label: '二级学习' },
  { key: 'behavior', label: '三级行为' },
  { key: 'result', label: '四级结果' }
];
// 修正：所有题目类型都兼容BaseQ
const kirkpatrickQuestions: Record<string, BaseQ[]> = {
  reaction: [
    { id: 1, text: '您对培训整体满意度如何？' },
    { id: 2, text: '培训内容是否符合您的期望？' },
    { id: 3, text: '讲师授课风格是否易于理解？' },
    { id: 4, text: '培训环境与组织是否满意？' },
    { id: 5, text: '课程节奏与时间安排是否合理？' },
    { id: 6, text: '课程案例/实操是否丰富？' },
    { id: 7, text: '您是否愿意推荐本课程？' },
    { id: 8, text: '培训氛围是否积极？' },
    { id: 9, text: '请写下您对本次培训的总体感受', open: true }
  ],
  learning: [
    { id: 11, text: '您对课程知识点掌握程度如何？' },
    { id: 12, text: '您能否清晰描述课程核心内容？' },
    { id: 13, text: '您能否举例说明所学知识？' },
    { id: 14, text: '您能否独立完成相关任务？' },
    { id: 15, text: '您能否将所学应用于实际？' },
    { id: 16, text: '您能否解答同事相关问题？' },
    { id: 17, text: '您能否发现并纠正以往工作中的不足？' },
    { id: 18, text: '您能否提出改进建议？' },
    { id: 19, text: '请写下您印象最深的学习收获', open: true }
  ],
  behavior: [
    { id: 21, text: '您在工作中是否主动应用所学？' },
    { id: 22, text: '您是否改变了以往的工作习惯？' },
    { id: 23, text: '您是否带动团队成员共同进步？' },
    { id: 24, text: '您是否主动分享学习成果？' },
    { id: 25, text: '您是否能持续优化工作流程？' },
    { id: 26, text: '您是否能主动寻求反馈并改进？' },
    { id: 27, text: '您是否能将所学转化为实际绩效？' },
    { id: 28, text: '您是否能影响他人行为？' },
    { id: 29, text: '请举例说明您在工作中的具体改变', open: true }
  ],
  result: [
    { id: 31, text: '培训后团队绩效是否提升？' },
    { id: 32, text: '培训后业务指标是否改善？' },
    { id: 33, text: '培训后客户满意度是否提升？' },
    { id: 34, text: '培训后创新项目是否增多？' },
    { id: 35, text: '培训后员工流失率是否下降？' },
    { id: 36, text: '培训后组织氛围是否改善？' },
    { id: 37, text: '培训后成本是否降低？' },
    { id: 38, text: '培训后组织影响力是否提升？' },
    { id: 39, text: '请用数据或案例说明培训带来的变化', open: true }
  ]
};
// ROI评估题库
const roiQuestions: BaseQ[] = [
  { id: 1, text: '您认为本次培训的投资回报率如何？' },
  { id: 2, text: '培训后您所在团队的产出是否有所增加？' },
  { id: 3, text: '培训后您个人的工作效率是否提升？' },
  { id: 4, text: '培训后您是否能更好地控制项目成本？' },
  { id: 5, text: '培训后您是否能更有效地管理时间？' },
  { id: 6, text: '培训后您是否能更好地应对工作压力？' },
  { id: 7, text: '培训后您是否能更积极地与同事合作？' },
  { id: 8, text: '培训后您是否能更主动地分享知识？' },
  { id: 9, text: '请描述培训带给您或团队的具体收益', open: true }
];
// 问卷调查题库
const surveyQuestions: BaseQ[] = [
  { id: 1, text: '您对本次培训的整体满意度如何？', options: ['非常不满意', '不满意', '一般', '满意', '非常满意'] },
  { id: 2, text: '您认为培训内容的实用性如何？', options: ['非常不实用', '不实用', '一般', '实用', '非常实用'] },
  { id: 3, text: '您对讲师的授课方式满意吗？', options: ['非常不满意', '不满意', '一般', '满意', '非常满意'] },
  { id: 4, text: '您认为培训时长合适吗？', options: ['太短', '偏短', '刚好', '偏长', '太长'] },
  { id: 5, text: '您愿意参加类似的培训吗？', options: ['非常不愿意', '不愿意', '一般', '愿意', '非常愿意'] },
  { id: 6, text: '您对本次培训的期望是否得到满足？', options: ['完全没有', '基本没有', '一般', '基本满足', '完全满足'] },
  { id: 7, text: '您认为培训的互动环节如何？', options: ['非常差', '较差', '一般', '较好', '非常好'] },
  { id: 8, text: '您对培训后的跟进支持满意吗？', options: ['非常不满意', '不满意', '一般', '满意', '非常满意'] },
  { id: 9, text: '请分享您对本次培训的其他建议或意见', open: true }
];
// 课程反馈题库
const courseFeedbackQuestions: BaseQ[] = [
  { id: 1, text: '您对本次课程的整体满意度如何？', options: ['非常不满意', '不满意', '一般', '满意', '非常满意'] },
  { id: 2, text: '您认为课程内容的实用性如何？', options: ['非常不实用', '不实用', '一般', '实用', '非常实用'] },
  { id: 3, text: '您对讲师的授课方式满意吗？', options: ['非常不满意', '不满意', '一般', '满意', '非常满意'] },
  { id: 4, text: '您认为课程时长合适吗？', options: ['太短', '偏短', '刚好', '偏长', '太长'] },
  { id: 5, text: '您愿意参加类似的课程吗？', options: ['非常不愿意', '不愿意', '一般', '愿意', '非常愿意'] },
  { id: 6, text: '您对本次课程的期望是否得到满足？', options: ['完全没有', '基本没有', '一般', '基本满足', '完全满足'] },
  { id: 7, text: '您认为课程的互动环节如何？', options: ['非常差', '较差', '一般', '较好', '非常好'] },
  { id: 8, text: '您对课程后的跟进支持满意吗？', options: ['非常不满意', '不满意', '一般', '满意', '非常满意'] },
  { id: 9, text: '请分享您对本次课程的其他建议或意见', open: true }
];

// 本地存储工具
const saveRecord = (type: string, data: any) => {
  const records = JSON.parse(localStorage.getItem('evaluationRecords') || '[]');
  records.push({ type, time: new Date().toLocaleString(), data });
  localStorage.setItem('evaluationRecords', JSON.stringify(records));
};
const getRecords = (type: string) => {
  const records = JSON.parse(localStorage.getItem('evaluationRecords') || '[]');
  return records.filter((r: any) => r.type === type);
};

// 统一答案结构
interface AnswerMap { [qid: number]: string | number; }

// 统计分析工具
const calcStats = (records: any[], questions: BaseQ[]) => {
  const stats: { [qid: number]: { avg?: number; count: number; open: string[] } } = {};
  questions.forEach(q => {
    stats[q.id] = { count: 0, open: [] };
  });
  records.forEach(r => {
    Object.entries(r.data.answers || {}).forEach(([qid, val]) => {
      const q = questions.find(q => q.id === Number(qid));
      if (!q) return;
      if (q.open) {
        if (val && typeof val === 'string') stats[q.id].open.push(val);
      } else if (!isNaN(Number(val))) {
        stats[q.id].count++;
        stats[q.id].avg = (stats[q.id].avg || 0) + Number(val);
      }
    });
  });
  Object.values(stats).forEach(s => { if (s.avg) s.avg = +(s.avg / s.count).toFixed(2); });
  return stats;
};

const EvaluationFeedback: React.FC = () => {
  // 交互状态
  const [type, setType] = useState<EvalType>('360');
  const [role, setRole] = useState<EvalRole>('student');
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [kirkLevel, setKirkLevel] = useState('reaction');
  const [showHistory, setShowHistory] = useState(false);
  const [historyType, setHistoryType] = useState('');

  // 题库选择
  const getQuestions = () => {
    if (type === '360') return eval360Questions[role];
    if (type === 'kirkpatrick') return kirkpatrickQuestions[kirkLevel];
    if (type === 'roi') return roiQuestions;
    if (type === 'survey') return surveyQuestions;
    if (type === 'course') return courseFeedbackQuestions;
    return [];
  };

  // 答案变更
  const handleChange = (qid: number, val: string | number) => {
    setAnswers(a => ({ ...a, [qid]: val }));
  };

  // 提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let extra: any = {};
    if (type === '360') extra.role = role;
    if (type === 'kirkpatrick') extra.level = kirkLevel;
    saveRecord(type, { ...extra, answers });
    setSubmitted(true);
  };

  // 重置
  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  // 历史与统计
  const records = getRecords(type);
  const questions = getQuestions();
  const stats = calcStats(records, questions);

  // 导出
  const exportHistory = (type: string) => {
    if (!records.length) return alert('暂无记录');
    const ws = XLSX.utils.json_to_sheet(records.map((r: any) => ({ 时间: r.time, ...r.data.answers })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '历史记录');
    XLSX.writeFile(wb, `${type}_评估历史_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  // 表单渲染
  const renderForm = () => (
    <form style={{ background: '#fff', borderRadius: 8, padding: 24 }} onSubmit={handleSubmit}>
      <h4 style={{ color: '#1769aa' }}>
        {
          type === '360' ? `360度评估 - ${role}` :
          type === 'kirkpatrick' ? `柯氏四级评估 - ${kirkpatrickLevels.find(l => l.key === kirkLevel)?.label}` :
          type === 'roi' ? 'ROI评估' :
          type === 'survey' ? '问卷调查' :
          '课程反馈'
        }
      </h4>
      {questions.map(q => (
        <div key={q.id} style={{ marginBottom: 16 }}>
          <div>{q.text}{q.dimension ? <span style={{ color: '#888', marginLeft: 8 }}>({q.dimension})</span> : null}</div>
          {q.open ? (
            <textarea style={{ width: '100%', minHeight: 40 }} value={answers[q.id] || ''} onChange={e => handleChange(q.id, e.target.value)} />
          ) : q.options ? (
            q.options.map((opt: string) => (
              <label key={opt} style={{ marginRight: 12 }}>
                <input type="radio" name={`q${q.id}`} value={opt} checked={answers[q.id] === opt} onChange={() => handleChange(q.id, opt)} />
                {opt}
              </label>
            ))
          ) : (
            <div>
              {[1,2,3,4,5].map(score => (
                <label key={score} style={{ marginRight: 12 }}>
                  <input type="radio" name={`q${q.id}`} value={score} checked={answers[q.id] === score} onChange={() => handleChange(q.id, score)} />
                  {score}
                </label>
              ))} <span style={{ color: '#888' }}>1-5分</span>
            </div>
          )}
        </div>
      ))}
      <button type="submit" disabled={Object.keys(answers).length < questions.length}>提交</button>
    </form>
  );

  // 统计区
  const renderStats = () => (
    <div style={{ background: '#f9fafb', borderRadius: 8, padding: 16, margin: '16px 0' }}>
      <b>历史记录数：</b>{records.length}
      {questions.map(q => (
        <div key={q.id} style={{ fontSize: 13, margin: '4px 0 0 0' }}>
          <span>{q.text}</span>
          {q.open ? (
            stats[q.id].open.length > 0 && <span style={{ color: '#888', marginLeft: 8 }}>开放题数：{stats[q.id].open.length}</span>
          ) : (
            stats[q.id].count > 0 && <span style={{ color: '#888', marginLeft: 8 }}>平均分：{stats[q.id].avg}</span>
          )}
        </div>
      ))}
    </div>
  );

  // 历史弹窗
  const renderHistory = () => (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', zIndex: 99 }} onClick={() => setShowHistory(false)}>
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, maxWidth: 700, margin: '40px auto', position: 'relative' }} onClick={e => e.stopPropagation()}>
        <h4 style={{ color: '#1769aa' }}>历史记录 - {type}</h4>
        <button onClick={() => exportHistory(type)} style={{ marginBottom: 8 }}>导出为Excel</button>
        <ul style={{ maxHeight: 300, overflow: 'auto' }}>
          {records.length === 0 && <li>暂无记录</li>}
          {records.map((r: any, i: number) => (
            <li key={i} style={{ marginBottom: 8, borderBottom: '1px solid #eee' }}>
              <div style={{ fontSize: 12, color: '#888' }}>{r.time}</div>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{JSON.stringify(r.data, null, 2)}</pre>
            </li>
          ))}
        </ul>
        <button onClick={() => setShowHistory(false)} style={{ marginTop: 12 }}>关闭</button>
      </div>
    </div>
  );

  // 主体
  return (
    <div style={{ padding: 24 }}>
      <h2>评估反馈模块</h2>
      {/* 类型切换 */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <button onClick={() => { setType('360'); setSubmitted(false); setAnswers({}); }} style={{ fontWeight: type==='360'?'bold':undefined }}>360度评估</button>
        <button onClick={() => { setType('kirkpatrick'); setSubmitted(false); setAnswers({}); }} style={{ fontWeight: type==='kirkpatrick'?'bold':undefined }}>柯氏四级评估</button>
        <button onClick={() => { setType('roi'); setSubmitted(false); setAnswers({}); }} style={{ fontWeight: type==='roi'?'bold':undefined }}>ROI评估</button>
        <button onClick={() => { setType('survey'); setSubmitted(false); setAnswers({}); }} style={{ fontWeight: type==='survey'?'bold':undefined }}>问卷调查</button>
        <button onClick={() => { setType('course'); setSubmitted(false); setAnswers({}); }} style={{ fontWeight: type==='course'?'bold':undefined }}>课程反馈</button>
      </div>
      {/* 360度评估视角切换 */}
      {type === '360' && !submitted && (
        <div style={{ marginBottom: 16 }}>
          <b>评估视角：</b>
          {(['student','manager','peer','lecturer'] as EvalRole[]).map(r => (
            <button key={r} onClick={() => { setRole(r); setAnswers({}); setSubmitted(false); }} style={{ fontWeight: r === role ? 'bold' : undefined }}>{r}</button>
          ))}
        </div>
      )}
      {/* 柯氏四级评估级别切换 */}
      {type === 'kirkpatrick' && !submitted && (
        <div style={{ marginBottom: 16 }}>
          <b>评估级别：</b>
          {kirkpatrickLevels.map(l => (
            <button key={l.key} onClick={() => { setKirkLevel(l.key); setAnswers({}); setSubmitted(false); }} style={{ fontWeight: l.key === kirkLevel ? 'bold' : undefined }}>{l.label}</button>
          ))}
        </div>
      )}
      {/* 表单区 */}
      {!submitted && renderForm()}
      {/* 结果区 */}
      {submitted && (
        <div style={{ background: '#f4f8fb', borderRadius: 8, padding: 24 }}>
          <h4 style={{ color: '#1769aa' }}>评估已提交</h4>
          <button onClick={handleReset}>重新填写</button>
        </div>
      )}
      {/* 统计分析区 */}
      {renderStats()}
      {/* 历史记录入口按钮 */}
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => { setHistoryType(type); setShowHistory(true); }}>查看历史记录</button>
      </div>
      {/* 历史记录弹窗 */}
      {showHistory && renderHistory()}
    </div>
  );
};

export default EvaluationFeedback;
