import React, { useState } from 'react';

// 学习系统平台主模块骨架
const sections = [
  { key: 'dashboard', label: '平台总览' },
  { key: 'learning', label: '学习中心' },
  { key: 'profile', label: '个人空间' },
  { key: 'tasks', label: '任务日程' },
  { key: 'admin', label: '系统管理' }
];

const SystemPlatform: React.FC = () => {
  const [active, setActive] = useState('dashboard');

  // 平台总览区块内容
  const renderDashboard = () => (
    <div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div style={{ flex: 1, background: '#f4f8fb', borderRadius: 8, padding: 20, minWidth: 180 }}>
          <div style={{ fontSize: 13, color: '#888' }}>本月学习人次</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#1769aa' }}>1280</div>
        </div>
        <div style={{ flex: 1, background: '#f4f8fb', borderRadius: 8, padding: 20, minWidth: 180 }}>
          <div style={{ fontSize: 13, color: '#888' }}>累计课程数</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#1769aa' }}>56</div>
        </div>
        <div style={{ flex: 1, background: '#f4f8fb', borderRadius: 8, padding: 20, minWidth: 180 }}>
          <div style={{ fontSize: 13, color: '#888' }}>活跃学员</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#1769aa' }}>312</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 2, background: '#fff', borderRadius: 8, padding: 20, minHeight: 120, boxShadow: '0 1px 4px #eee' }}>
          <b>平台公告</b>
          <ul style={{ margin: '12px 0 0 0', padding: 0, listStyle: 'none', fontSize: 14 }}>
            <li>· 6月新课程上线，欢迎报名！</li>
            <li>· 领导力训练营报名截止至6月15日</li>
            <li>· 系统将于本周末凌晨维护升级</li>
          </ul>
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: 20, minHeight: 120, boxShadow: '0 1px 4px #eee' }}>
          <b>快捷入口</b>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            <button style={{ border: '1px solid #1769aa', borderRadius: 4, background: '#f4f8fb', color: '#1769aa', padding: '6px 0' }}>进入学习中心</button>
            <button style={{ border: '1px solid #1769aa', borderRadius: 4, background: '#f4f8fb', color: '#1769aa', padding: '6px 0' }}>我的课程</button>
            <button style={{ border: '1px solid #1769aa', borderRadius: 4, background: '#f4f8fb', color: '#1769aa', padding: '6px 0' }}>积分商城</button>
          </div>
        </div>
      </div>
    </div>
  );

  // 学习中心区块内容
  const renderLearning = () => (
    <div>
      <h3 style={{ color: '#1769aa', marginBottom: 16 }}>学习中心</h3>
      <div style={{ display: 'flex', gap: 24 }}>
        {/* 课程推荐 */}
        <div style={{ flex: 2, background: '#f9fafb', borderRadius: 8, padding: 20, minHeight: 180 }}>
          <b>推荐课程</b>
          <ul style={{ margin: '12px 0 0 0', padding: 0, listStyle: 'none', fontSize: 15 }}>
            <li>· 领导力实战训练营</li>
            <li>· 高效沟通与影响力</li>
            <li>· 项目管理实务</li>
            <li>· 创新思维与变革</li>
          </ul>
        </div>
        {/* 资源区块 */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: 20, minHeight: 180, boxShadow: '0 1px 4px #eee' }}>
          <b>学习资源</b>
          <ul style={{ margin: '12px 0 0 0', padding: 0, listStyle: 'none', fontSize: 15 }}>
            <li>· 电子书库</li>
            <li>· 视频微课</li>
            <li>· 行业案例</li>
          </ul>
        </div>
      </div>
      {/* 任务与进度 */}
      <div style={{ marginTop: 24, background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 4px #eee' }}>
        <b>我的学习任务</b>
        <div style={{ marginTop: 12, display: 'flex', gap: 32 }}>
          <div>当前任务：<span style={{ color: '#1769aa' }}>完成“领导力实战训练营”第2单元</span></div>
          <div>进度：<span style={{ color: '#1769aa' }}>60%</span></div>
          <div>截止日期：2025-06-30</div>
        </div>
      </div>
    </div>
  );

  // 个人空间区块内容
  const renderProfile = () => (
    <div>
      <h3 style={{ color: '#1769aa', marginBottom: 16 }}>个人空间</h3>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1, background: '#f9fafb', borderRadius: 8, padding: 20, minHeight: 160 }}>
          <b>学习档案</b>
          <div style={{ marginTop: 12, fontSize: 15 }}>
            累计学习时长：<span style={{ color: '#1769aa' }}>42小时</span><br />
            获得证书：<span style={{ color: '#1769aa' }}>3项</span><br />
            积分：<span style={{ color: '#1769aa' }}>1200</span>
          </div>
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: 20, minHeight: 160, boxShadow: '0 1px 4px #eee' }}>
          <b>成长足迹</b>
          <ul style={{ margin: '12px 0 0 0', padding: 0, listStyle: 'none', fontSize: 15 }}>
            <li>· 2025-05 获得“高效沟通”证书</li>
            <li>· 2025-04 完成“创新思维”课程</li>
            <li>· 2025-03 获得“项目管理”证书</li>
          </ul>
        </div>
      </div>
      <div style={{ marginTop: 24, background: '#f9fafb', borderRadius: 8, padding: 20 }}>
        <b>我的证书</b>
        <div style={{ marginTop: 12, display: 'flex', gap: 16 }}>
          <div style={{ background: '#fff', borderRadius: 6, padding: 12, minWidth: 120, boxShadow: '0 1px 4px #eee' }}>领导力实战</div>
          <div style={{ background: '#fff', borderRadius: 6, padding: 12, minWidth: 120, boxShadow: '0 1px 4px #eee' }}>高效沟通</div>
          <div style={{ background: '#fff', borderRadius: 6, padding: 12, minWidth: 120, boxShadow: '0 1px 4px #eee' }}>项目管理</div>
        </div>
      </div>
    </div>
  );

  // 任务日程区块内容
  const renderTasks = () => (
    <div>
      <h3 style={{ color: '#1769aa', marginBottom: 16 }}>任务日程</h3>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 2, background: '#fff', borderRadius: 8, padding: 20, minHeight: 160, boxShadow: '0 1px 4px #eee' }}>
          <b>学习计划</b>
          <ul style={{ margin: '12px 0 0 0', padding: 0, listStyle: 'none', fontSize: 15 }}>
            <li>· 6月：完成“领导力实战训练营”全部单元</li>
            <li>· 7月：报名“创新思维与变革”课程</li>
            <li>· 7月：参与“高效沟通”实战演练</li>
          </ul>
        </div>
        <div style={{ flex: 1, background: '#f9fafb', borderRadius: 8, padding: 20, minHeight: 160 }}>
          <b>日历提醒</b>
          <div style={{ marginTop: 12, fontSize: 15 }}>
            <div>6月10日：领导力训练营直播</div>
            <div>6月15日：报名截止</div>
            <div>6月30日：任务完成检查</div>
          </div>
        </div>
      </div>
    </div>
  );

  // 系统管理区块内容
  const renderAdmin = () => (
    <div>
      <h3 style={{ color: '#1769aa', marginBottom: 16 }}>系统管理</h3>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: 20, minHeight: 160, boxShadow: '0 1px 4px #eee' }}>
          <b>用户管理</b>
          <ul style={{ margin: '12px 0 0 0', padding: 0, listStyle: 'none', fontSize: 15 }}>
            <li>· 学员账号管理</li>
            <li>· 讲师账号管理</li>
            <li>· 组织架构设置</li>
          </ul>
        </div>
        <div style={{ flex: 1, background: '#f9fafb', borderRadius: 8, padding: 20, minHeight: 160 }}>
          <b>权限与数据</b>
          <ul style={{ margin: '12px 0 0 0', padding: 0, listStyle: 'none', fontSize: 15 }}>
            <li>· 角色权限分配</li>
            <li>· 数据统计与导出</li>
            <li>· 系统日志审计</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // 各区块内容占位
  const renderSection = () => {
    switch (active) {
      case 'dashboard':
        return renderDashboard();
      case 'learning':
        return renderLearning();
      case 'profile':
        return renderProfile();
      case 'tasks':
        return renderTasks();
      case 'admin':
        return renderAdmin();
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>学习系统平台</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        {sections.map(sec => (
          <button
            key={sec.key}
            onClick={() => setActive(sec.key)}
            style={{ fontWeight: active === sec.key ? 'bold' : undefined }}
          >
            {sec.label}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, minHeight: 200 }}>
        {renderSection()}
      </div>
    </div>
  );
};

export default SystemPlatform;
