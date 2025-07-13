// 团队信息模块
import React from 'react';

const TeamInfo: React.FC = () => {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h2 style={{ color: '#1769aa', marginBottom: 24 }}>团队信息</h2>
      <div style={{ background: '#f4f8fb', borderRadius: 8, padding: 24, marginBottom: 24 }}>
        <b>核心成员介绍：</b> 展示团队成员、专业背景、实战经验。
        <ul style={{ marginTop: 12 }}>
          <li>团队成员列表与简介</li>
          <li>专业领域与项目经验</li>
          <li>荣誉与成果展示</li>
        </ul>
      </div>
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, color: '#888' }}>
        <b>团队文化与发展：</b> <span>（后续可扩展团队文化、成长故事等内容）</span>
      </div>
    </div>
  );
};

export default TeamInfo;
