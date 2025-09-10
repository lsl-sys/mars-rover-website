import React, { useState } from 'react';
import './TrainingMaterials.css';

// 培训资料数据 - 按照电控、机械、硬件分类
const trainingMaterials = [
  {
    id: 1,
    title: '电控',
    description: '包括嵌入式系统、电机控制、通信协议、传感器应用和电源系统等内容，帮助您掌握火星车的电子控制技术。',
    subItems: [
      {
        name: '电控培训大纲',
        isPdf: true,
        url: '/PDF/Electronic_Control_outline.pdf'
      },
      {
        name: '嵌入式系统基础',
        subItems: [
          { name: '嵌入式系统概述' },
          { name: 'MCU选型与介绍' },
          { name: '嵌入式C语言编程' },
          { name: '嵌入式C++编程' }
        ]
      },
      {
        name: '电机控制',
        subItems: [
          { name: '直流电机原理' },
          { name: '步进电机控制' },
          { name: '电机驱动电路设计' },
          { name: 'PID算法原理与实现' }
        ]
      },
      {
        name: '通信协议',
        subItems: [
          { name: 'CAN总线通信' },
          { name: 'UART通信' },
          { name: 'SPI与I2C通信' },
          { name: '无线通信技术' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: '机械',
    description: '涵盖机械设计基础、底盘设计、传动系统、结构设计以及3D打印与加工等知识，助您了解火星车的机械结构设计。',
    subItems: [
      { name: '机械设计基础' },
      { name: '底盘设计' },
      { name: '传动系统' },
      { name: '结构设计' },
      { name: '3D打印与加工' }
    ]
  },
  {
    id: 3,
    title: '硬件',
    description: '包含电路设计基础、PCB设计、电子元件、硬件调试和测试等内容，让您掌握火星车硬件开发的核心技能。',
    subItems: [
      { name: '电路设计基础' },
      { name: 'PCB设计' },
      { name: '电子元件' },
      { name: '硬件调试' },
      { name: '硬件测试' }
    ]
  },
  {
    id: 4,
    title: '运营',
    description: '涵盖项目管理、团队协作、文档撰写、活动策划和品牌推广等内容，助您掌握团队运营的核心技能。',
    subItems: [
      { name: '项目管理' },
      { name: '团队协作' },
      { name: '文档撰写' },
      { name: '活动策划' },
      { name: '品牌推广' }
    ]
  }
];

const TrainingMaterials = () => {
  // 状态管理
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  
  // 处理PDF文件下载
  const handlePdfClick = (url) => {
    window.open(url, '_blank');
  };

  // 处理链接点击
  const handleLinkClick = (url, e) => {
    e.preventDefault();
    window.open(url, '_blank');
  };

  // 处理分类点击
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowWelcome(false);
  };

  // 返回欢迎页面
  const handleBackToWelcome = () => {
    setSelectedCategory(null);
    setShowWelcome(true);
  };

  // 渲染子项
  const renderSubItems = (subItems, level = 0) => {
    if (!subItems) return null;
    
    return (
      <ul className={`sub-items level-${level}`}>
        {subItems.map((item, index) => (
          <li key={index}>
            {item.isPdf ? (
              <button 
                className="pdf-link"
                onClick={() => handlePdfClick(item.url)}
              >
                📄 {item.name}
              </button>
            ) : item.isLink ? (
              <a 
                href={item.url} 
                className="external-link"
                onClick={(e) => handleLinkClick(item.url, e)}
                target="_blank" 
                rel="noopener noreferrer"
              >
                🔗 {item.name}
              </a>
            ) : (
              <span>{item.name}</span>
            )}
            {item.subItems && renderSubItems(item.subItems, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="training-materials-container">
      <div className="materials-header">
        <h1>培训资料</h1>
          <p>重邮-京东未来智能视觉联合研究实践基地嵌入式开发相关资料</p>
      </div>
      
      <div className="materials-content">
        <div className="materials-sidebar">
          <div className="sidebar-header">
            <h2>目录大纲</h2>
            {!showWelcome && (
              <button className="back-button" onClick={handleBackToWelcome}>
                ← 返回
              </button>
            )}
          </div>
          {trainingMaterials.map((section) => (
            <div key={section.id} className="section">
              <h3>{section.title}</h3>
              {renderSubItems(section.subItems)}
            </div>
          ))}
        </div>
        
        <div className="materials-main">
          {showWelcome ? (
            <div className="materials-welcome">
              <h2>欢迎查看培训资料</h2>
              <p>火星车项目培训资料分为电控、机械、硬件、运营四个主要类别，请从左侧菜单选择您需要的资料进行查看。</p>
              
              <div className="category-overview">
                <h3>培训资料分类概览</h3>
                <div className="category-cards">
                  {trainingMaterials.map((category) => (
                    <div 
                      key={category.id} 
                      className="category-card"
                      onClick={() => handleCategoryClick(category)}
                    >
                      <h4>{category.title}</h4>
                      <p>{category.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="usage-guide">
                <h3>使用指南</h3>
                <ul>
                  <li>点击左侧分类展开子菜单，选择具体的培训资料</li>
                  <li>带有📄图标的条目表示可以直接查看PDF文档</li>
                  <li>后续将逐步完善各类资料内容，请持续关注更新</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="category-detail">
              <div className="detail-header">
                <h2>{selectedCategory.title}</h2>
                <button className="back-button" onClick={handleBackToWelcome}>
                  ← 返回
                </button>
              </div>
              
              <div className="detail-content">
                <div className="detail-description">
                  <p>{selectedCategory.description}</p>
                </div>
                
                <div className="detail-materials">
                  <h3>相关资料</h3>
                  <ul className="materials-list">
                    {selectedCategory.subItems.map((item, index) => (
                      <li key={index} className="material-item">
                        {item.isPdf ? (
                          <button 
                            className="pdf-link"
                            onClick={() => handlePdfClick(item.url)}
                          >
                            📄 {item.name}
                          </button>
                        ) : (
                          <div>
                            <span className="material-title">{item.name}</span>
                            {item.subItems && (
                              <ul className="sub-materials-list">
                                {item.subItems.map((subItem, subIndex) => (
                                  <li key={subIndex} className="sub-material-item">
                                    {subItem.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingMaterials;