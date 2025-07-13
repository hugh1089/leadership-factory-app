import React, { useState } from 'react';
import './OperationService.css';
import OperationServiceStudents from './OperationServiceStudents';
import OperationServiceSignup from './OperationServiceSignup';
import OperationServiceHomework from './OperationServiceHomework';
import OperationServiceCommunity from './OperationServiceCommunity';
import OperationServicePoints from './OperationServicePoints';
import OperationServiceFeedback from './OperationServiceFeedback';

const tabs = [
  { key: 'students', label: '学员管理' },
  { key: 'signup', label: '报名签到' },
  { key: 'homework', label: '作业成果' },
  { key: 'community', label: '互动社区' },
  { key: 'points', label: '激励积分' },
  { key: 'feedback', label: '反馈服务' },
];

export default function OperationService({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('students');

  return (
    <div className="operation-service-container">
      <div className="operation-service-header">
        <button className="back-btn" onClick={onBack}>返回首页</button>
        <h2>运营服务</h2>
      </div>
      <div className="operation-service-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? 'active' : ''}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="operation-service-content">
        {activeTab === 'students' && <OperationServiceStudents />}
        {activeTab === 'signup' && <OperationServiceSignup />}
        {activeTab === 'homework' && <OperationServiceHomework />}
        {activeTab === 'community' && <OperationServiceCommunity />}
        {activeTab === 'points' && <OperationServicePoints />}
        {activeTab === 'feedback' && <OperationServiceFeedback />}
      </div>
    </div>
  );
}
