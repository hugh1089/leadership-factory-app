// 服务方式模块
import React from 'react';

const ServiceMethod: React.FC = () => {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h2 style={{ color: '#1769aa', marginBottom: 24 }}>服务方式</h2>
      <div style={{ background: '#f4f8fb', borderRadius: 8, padding: 24, marginBottom: 24 }}>
        <b>服务类型：</b> 定制化培训、咨询服务、线上线下融合、长期陪伴。
        <ul style={{ marginTop: 12 }}>
          <li>定制化培训方案</li>
          <li>咨询与陪伴式服务</li>
          <li>线上线下混合交付</li>
          <li>联系方式：contact@leadershipfactory.com</li>
        </ul>
      </div>
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, color: '#888' }}>
        <b>服务创新与合作：</b> <span>（后续可扩展更多服务模式、合作伙伴等）</span>
      </div>
    </div>
  );
};

export default ServiceMethod;
