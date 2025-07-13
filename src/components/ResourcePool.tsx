import React, { useState } from 'react';
import './ResourcePool.css';

const talentTypes = ['讲师', '教练', '专家', '供应商'];
const resourceTypes = ['课程包', '案例库', '视频', 'PPT', '测评工具', '学习平台', '互动工具'];
const partnerTypes = ['高校', '咨询公司', '平台方', '其他'];

const ResourcePool: React.FC = () => {
  // 人才资源
  const [talents, setTalents] = useState<any[]>([]);
  const [talentType, setTalentType] = useState('讲师');
  const [talentName, setTalentName] = useState('');
  const [talentTags, setTalentTags] = useState('');
  const [talentFile, setTalentFile] = useState<File|null>(null);

  // 内容/工具资源
  const [resources, setResources] = useState<any[]>([]);
  const [resourceType, setResourceType] = useState('课程包');
  const [resourceName, setResourceName] = useState('');
  const [resourceTags, setResourceTags] = useState('');
  const [resourceFile, setResourceFile] = useState<File|null>(null);

  // 合作伙伴
  const [partners, setPartners] = useState<any[]>([]);
  const [partnerType, setPartnerType] = useState('高校');
  const [partnerName, setPartnerName] = useState('');
  const [partnerContact, setPartnerContact] = useState('');
  const [partnerFile, setPartnerFile] = useState<File|null>(null);

  // 添加人才
  const handleAddTalent = () => {
    if (talentName) {
      setTalents([...talents, { type: talentType, name: talentName, tags: talentTags, file: talentFile }]);
      setTalentName(''); setTalentTags(''); setTalentFile(null);
    }
  };
  // 添加资源
  const handleAddResource = () => {
    if (resourceName) {
      setResources([...resources, { type: resourceType, name: resourceName, tags: resourceTags, file: resourceFile }]);
      setResourceName(''); setResourceTags(''); setResourceFile(null);
    }
  };
  // 添加合作伙伴
  const handleAddPartner = () => {
    if (partnerName) {
      setPartners([...partners, { type: partnerType, name: partnerName, contact: partnerContact, file: partnerFile }]);
      setPartnerName(''); setPartnerContact(''); setPartnerFile(null);
    }
  };

  return (
    <div className="resource-pool-container">
      <h2 className="resource-title">资源与能力池管理</h2>
      <section className="resource-section">
        <h3>1. 人才资源管理</h3>
        <div className="resource-row">
          <label>类型：</label>
          <select value={talentType} onChange={e => setTalentType(e.target.value)}>{talentTypes.map(t => <option key={t}>{t}</option>)}</select>
          <label>姓名/机构：</label>
          <input value={talentName} onChange={e => setTalentName(e.target.value)} placeholder="如：王教授/XX公司" />
          <label>标签：</label>
          <input value={talentTags} onChange={e => setTalentTags(e.target.value)} placeholder="如：领导力/创新/实战" />
          <label>附件：</label>
          <input type="file" onChange={e => setTalentFile(e.target.files?.[0]||null)} />
          <button type="button" className="business-btn" onClick={handleAddTalent}>新增</button>
        </div>
        <ul className="resource-list">
          {talents.map((t,i) => <li key={i}><b>{t.type}</b>：{t.name}（{t.tags}）{t.file && <span> [已上传]</span>}</li>)}
        </ul>
      </section>
      <section className="resource-section">
        <h3>2. 内容与工具资源池</h3>
        <div className="resource-row">
          <label>类型：</label>
          <select value={resourceType} onChange={e => setResourceType(e.target.value)}>{resourceTypes.map(t => <option key={t}>{t}</option>)}</select>
          <label>名称：</label>
          <input value={resourceName} onChange={e => setResourceName(e.target.value)} placeholder="如：创新案例库" />
          <label>标签：</label>
          <input value={resourceTags} onChange={e => setResourceTags(e.target.value)} placeholder="如：案例/工具/平台" />
          <label>附件：</label>
          <input type="file" onChange={e => setResourceFile(e.target.files?.[0]||null)} />
          <button type="button" className="business-btn" onClick={handleAddResource}>新增</button>
        </div>
        <ul className="resource-list">
          {resources.map((r,i) => <li key={i}><b>{r.type}</b>：{r.name}（{r.tags}）{r.file && <span> [已上传]</span>}</li>)}
        </ul>
      </section>
      <section className="resource-section">
        <h3>3. 外部合作与生态</h3>
        <div className="resource-row">
          <label>类型：</label>
          <select value={partnerType} onChange={e => setPartnerType(e.target.value)}>{partnerTypes.map(t => <option key={t}>{t}</option>)}</select>
          <label>名称：</label>
          <input value={partnerName} onChange={e => setPartnerName(e.target.value)} placeholder="如：XX高校/XX平台" />
          <label>联系人：</label>
          <input value={partnerContact} onChange={e => setPartnerContact(e.target.value)} placeholder="如：李老师/张经理" />
          <label>附件：</label>
          <input type="file" onChange={e => setPartnerFile(e.target.files?.[0]||null)} />
          <button type="button" className="business-btn" onClick={handleAddPartner}>新增</button>
        </div>
        <ul className="resource-list">
          {partners.map((p,i) => <li key={i}><b>{p.type}</b>：{p.name}（联系人：{p.contact}）{p.file && <span> [已上传]</span>}</li>)}
        </ul>
      </section>
    </div>
  );
};

export default ResourcePool;
