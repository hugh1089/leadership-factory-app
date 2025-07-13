// 知识管理模块
import React, { useState } from 'react';

interface KnowledgeDoc {
  id: string;
  title: string;
  type: string;
  tags: string[];
  author: string;
  updated: string;
  views: number;
  downloads: number;
}

const mockDocs: KnowledgeDoc[] = [
  { id: '1', title: '领导力模型白皮书', type: '文档', tags: ['领导力', '模型'], author: '王老师', updated: '2025-06-01', views: 120, downloads: 30 },
  { id: '2', title: '团队激励案例', type: '案例', tags: ['激励', '案例'], author: '李教练', updated: '2025-05-28', views: 80, downloads: 18 },
  { id: '3', title: 'OKR工具模板', type: '工具', tags: ['OKR', '工具'], author: '张助理', updated: '2025-05-20', views: 60, downloads: 22 },
];

const tabs = [
  { key: 'overview', label: '总览' },
  { key: 'library', label: '知识库' },
  { key: 'innovation', label: '创新孵化' },
  { key: 'stats', label: '统计分析' },
  { key: 'ai', label: '智能推荐' },
  { key: 'admin', label: '管理后台' },
];

const KnowledgeManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [docs, setDocs] = useState(mockDocs);

  // 过滤知识文档
  const filteredDocs = docs.filter(d => d.title.includes(search) || d.tags.some(t => t.includes(search)));

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <h2 style={{ color: '#1769aa', marginBottom: 24 }}>知识管理中心</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ fontWeight: activeTab === tab.key ? 'bold' : undefined }}>{tab.label}</button>
        ))}
      </div>
      {/* 总览 */}
      {activeTab === 'overview' && (
        <div>
          <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
            <div style={{ background: '#f4f8fb', borderRadius: 12, padding: 24, minWidth: 160, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1769aa' }}>{docs.length}</div>
              <div style={{ color: '#888', fontSize: 15 }}>知识总量</div>
            </div>
            <div style={{ background: '#f4f8fb', borderRadius: 12, padding: 24, minWidth: 160, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1769aa' }}>3</div>
              <div style={{ color: '#888', fontSize: 15 }}>分类数</div>
            </div>
            <div style={{ background: '#f4f8fb', borderRadius: 12, padding: 24, minWidth: 160, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1769aa' }}>228</div>
              <div style={{ color: '#888', fontSize: 15 }}>累计访问</div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 8, padding: 24, marginBottom: 24 }}>
            <b>最新动态：</b>
            <ul style={{ marginTop: 12 }}>
              <li>2025-06-01 王老师上传《领导力模型白皮书》</li>
              <li>2025-05-28 李教练分享《团队激励案例》</li>
              <li>2025-05-20 张助理上传《OKR工具模板》</li>
            </ul>
          </div>
          <div style={{ background: '#f4f8fb', borderRadius: 8, padding: 24, color: '#888' }}>
            <b>智能推荐：</b> <span>（AI推荐相关知识、创新点、学习资源）</span>
          </div>
        </div>
      )}
      {/* 知识库 */}
      {activeTab === 'library' && (
        <div>
          <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
            <input placeholder="搜索知识标题/标签" value={search} onChange={e => setSearch(e.target.value)} style={{ width: 220 }} />
            <button disabled>上传知识</button>
            <button disabled>批量导出</button>
            <button disabled>分类管理</button>
            <button disabled>标签管理</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8 }}>
            <thead>
              <tr style={{ background: '#f4f8fb' }}>
                <th>标题</th><th>类型</th><th>标签</th><th>作者</th><th>更新时间</th><th>访问</th><th>下载</th><th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map(doc => (
                <tr key={doc.id}>
                  <td>{doc.title}</td>
                  <td>{doc.type}</td>
                  <td>{doc.tags.join(', ')}</td>
                  <td>{doc.author}</td>
                  <td>{doc.updated}</td>
                  <td>{doc.views}</td>
                  <td>{doc.downloads}</td>
                  <td>
                    <button disabled>预览</button>
                    <button disabled>下载</button>
                    <button disabled>编辑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* 创新孵化 */}
      {activeTab === 'innovation' && (
        <div style={{ background: '#fff', borderRadius: 8, padding: 24 }}>
          <h4 style={{ color: '#1769aa' }}>创新孵化区</h4>
          <ul>
            <li>新知识提报、创新点征集</li>
            <li>孵化流程管理（提报-评审-孵化-落地）</li>
            <li>经验复盘、最佳实践沉淀</li>
            <li>协作编辑、评论、点赞、收藏</li>
          </ul>
          <button disabled>提报创新点</button>
          <button disabled>创新项目管理</button>
        </div>
      )}
      {/* 统计分析 */}
      {activeTab === 'stats' && (
        <div style={{ background: '#fff', borderRadius: 8, padding: 24 }}>
          <h4 style={{ color: '#1769aa' }}>知识统计与分析</h4>
          <ul>
            <li>知识贡献榜、活跃度、引用/下载/阅读量统计</li>
            <li>组织知识地图/知识网络可视化</li>
          </ul>
          <button disabled>导出统计报告</button>
        </div>
      )}
      {/* 智能推荐 */}
      {activeTab === 'ai' && (
        <div style={{ background: '#fff', borderRadius: 8, padding: 24 }}>
          <h4 style={{ color: '#1769aa' }}>AI智能推荐</h4>
          <ul>
            <li>AI推荐相关知识、创新点、学习资源</li>
            <li>AI自动归档、标签、摘要、知识问答</li>
          </ul>
          <button disabled>一键智能推荐</button>
        </div>
      )}
      {/* 管理后台 */}
      {activeTab === 'admin' && (
        <div style={{ background: '#fff', borderRadius: 8, padding: 24 }}>
          <h4 style={{ color: '#1769aa' }}>知识管理后台</h4>
          <ul>
            <li>分类/标签/用户/权限管理</li>
            <li>批量导入导出、内容审核、日志追踪</li>
          </ul>
          <button disabled>进入后台</button>
        </div>
      )}
    </div>
  );
};

export default KnowledgeManagement;
