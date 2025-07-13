import React from 'react';
import './BrandHeader.css';
import logo from '../logo.svg';

interface BrandHeaderProps {
  slogan: string;
}

const aboutText = 'Leadership Factory（领导力工厂）专注于领导力加工与领导者培养，致力于以创新课程和工厂化流程，帮助企业和组织成就卓越人才，塑造面向未来的领导者。我们的使命是用系统化训练，培养真正的领导者。我们的价值观：您的选择，就是我们全力以赴的动力。服务对象涵盖民营、国有、跨国企业及各类组织。';

const BrandHeader: React.FC<BrandHeaderProps> = ({ slogan }) => (
  <div className="brand-header">
    <img src={logo} alt="Leadership Factory Logo" className="brand-logo" />
    <div className="brand-content">
      <h1 className="brand-title">Leadership Factory</h1>
      <div className="brand-slogan">{slogan}</div>
      <div className="brand-about">{aboutText}</div>
    </div>
  </div>
);

export default BrandHeader;
