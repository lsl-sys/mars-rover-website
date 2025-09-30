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
        imagePath: '/photo/电控大纲_00.png'
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
      },
      {
        name: '传感器应用',
        subItems: [
          { name: '传感器基础' },
          { name: '距离传感器应用' },
          { name: '图像传感器应用' },
          { name: '惯性测量单元(IMU)' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: '机械',
    description: '涵盖机械设计基础、底盘设计、传动系统、结构设计以及3D打印与加工等知识，助您了解火星车的机械结构设计。',
    subItems: [
      {
        name: '机械设计基础',
        subItems: [
          { name: '机械原理' },
          { name: '材料力学基础' },
          { name: 'SW软件基础' },
          { name: '机械设计标准' }
        ]
      },
      {
        name: '底盘设计',
        subItems: [
          { name: '火星车底盘概述' },
          { name: '悬架系统设计' },
          { name: '车轮设计' },
          { name: '轻量化设计原则' }
        ]
      },
      {
        name: '传动系统',
        subItems: [
          { name: '齿轮传动设计' },
          { name: '带传动与链传动' },
          { name: '减速器选型' },
          { name: '传动效率优化' }
        ]
      },
      {
        name: '结构设计',
        subItems: [
          { name: '框架结构设计' },
          { name: '应力分析方法' },
          { name: '防护结构设计' },
          { name: '模块化设计原则' }
        ]
      },
      {
        name: '3D打印与加工',
        subItems: [
          { name: '3D打印技术概述' },
          { name: '打印材料选择' },
          { name: '后处理工艺' },
          { name: '传统加工技术' }
        ]
      }
    ]
  },
  {
    id: 3,
    title: '硬件',
    description: '包含电路设计基础、PCB设计、电子元件、硬件调试和测试等内容，让您掌握火星车硬件开发的核心技能。',
    subItems: [
      {
        name: '电路设计基础',
        subItems: [
          { name: '电路理论基础' },
          { name: '模拟电路设计' },
          { name: '数字电路设计' },
          { name: '电路仿真技术' }
        ]
      },
      {
        name: 'PCB设计',
        subItems: [
          { name: 'PCB设计流程' },
          { name: '布局布线原则' },
          { name: 'EMC设计指南' },
          { name: '高速PCB设计' }
        ]
      },
      {
        name: '电子元件',
        subItems: [
          { name: '电阻电容选型' },
          { name: '晶体管应用' },
          { name: '集成电路基础' },
          { name: '元件可靠性分析' }
        ]
      },
      {
        name: '硬件调试',
        subItems: [
          { name: '调试工具使用' },
          { name: '电路故障排查' },
          { name: '信号测量技术' },
          { name: '电源完整性分析' }
        ]
      },
      {
        name: '硬件测试',
        subItems: [
          { name: '功能测试方法' },
          { name: '性能测试指标' },
          { name: '环境适应性测试' },
          { name: '可靠性测试标准' }
        ]
      }
    ]
  },
  {
    id: 4,
    title: '运营',
    description: '涵盖项目管理、团队协作、文档撰写、活动策划和品牌推广等内容，助您掌握团队运营的核心技能。',
    subItems: [
      {
        name: '项目管理',
        subItems: [
          { name: '项目管理基础' },
          { name: '时间管理技巧' },
          { name: '风险管理方法' },
          { name: '敏捷开发实践' }
        ]
      },
      {
        name: '团队协作',
        subItems: [
          { name: '团队建设方法' },
          { name: '有效沟通技巧' },
          { name: '冲突管理策略' },
          { name: '跨部门协作' }
        ]
      },
      {
        name: '文档撰写',
        subItems: [
          { name: '技术文档规范' },
          { name: '项目报告撰写' },
          { name: '设计文档模板' },
          { name: '用户手册编写' }
        ]
      },
      {
        name: '活动策划',
        subItems: [
          { name: '活动策划流程' },
          { name: '预算管理方法' },
          { name: '宣传推广策略' },
          { name: '赞助合作洽谈' }
        ]
      },
      {
        name: '品牌推广',
        subItems: [
          { name: '品牌建设基础' },
          { name: '社交媒体运营' },
          { name: '内容营销策略' },
          { name: '视觉设计规范' }
        ]
      }
    ]
  }
];

const TrainingMaterials = () => {
  // 状态管理
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [expandedSubItems, setExpandedSubItems] = useState({});
  const [expandedImage, setExpandedImage] = useState(null); // 用于控制图片放大显示

  // 处理分类点击
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowWelcome(false);
    // 重置展开状态
    setExpandedSubItems({});
  };

  // 返回欢迎页面
  const handleBackToWelcome = () => {
    setSelectedCategory(null);
    setShowWelcome(true);
    setExpandedSubItems({});
  };

  // 切换子项展开/折叠状态
  const toggleSubItem = (itemName) => {
    setExpandedSubItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  // 递归渲染子项目
  const renderSubItems = (subItems, level = 0) => {
    if (!subItems) return null;
    
    return (
      <ul className={`sub-items level-${level}`}>
        {subItems.map((item, index) => (
          <li key={index}>
            {item.isPdf ? (
              <div className="pdf-link">
                📄 {item.name}
                {item.imagePath && (
                  <div className="pdf-image-container">
                    <img 
                      src={item.imagePath} 
                      alt={item.name} 
                      className="pdf-preview-image"
                      loading="lazy"
                      onClick={() => setExpandedImage(item.imagePath)}
                      style={{ cursor: 'pointer' }}
                    />
                    <p className="image-hint">点击图片可放大查看</p>
                  </div>
                )}
              </div>
            ) : item.subItems ? (
              <div>
                <div 
                  className="sub-item-title"
                  onClick={() => toggleSubItem(item.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && toggleSubItem(item.name)}
                >
                  • {item.name}
                  <span className={`expand-icon ${expandedSubItems[item.name] ? 'expanded' : ''}`}>
                    {expandedSubItems[item.name] ? '▼' : '►'}
                  </span>
                </div>
                {expandedSubItems[item.name] && renderSubItems(item.subItems, level + 1)}
              </div>
            ) : (
              <span>{item.name}</span>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="training-materials-container">
      <div className="materials-header">
        <h1>培训资料</h1>
        <p>未来智视科创团队嵌入式开发相关资料</p>
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
                      onClick={() => handleCategoryClick(category.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(category.id)}
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
                  <li>点击左侧分类展开子菜单，查看具体的培训资料</li>
                  <li>点击带有▼/►符号的条目可以展开或折叠子项目</li>
                  <li>带有📄图标的条目表示相关PDF文档</li>
                  <li>后续将逐步完善各类资料内容，请持续关注更新</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="category-detail">
              
              <div className="detail-header">
                <h2>{trainingMaterials.find(cat => cat.id === selectedCategory)?.title || ''}</h2>
                <button className="back-button" onClick={handleBackToWelcome}>
                  ← 返回欢迎页
                </button>
              </div>
              
              <div className="detail-content">
                <div className="detail-description">
                  <p>{trainingMaterials.find(cat => cat.id === selectedCategory)?.description || ''}</p>
                </div>
                
                <div className="detail-materials">
                  <h3>相关资料</h3>
                  {renderSubItems(trainingMaterials.find(cat => cat.id === selectedCategory)?.subItems || [])}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    
    {/* 图片放大预览模态框 */}
    {expandedImage && (
      <div 
        className="image-modal" 
        onClick={() => setExpandedImage(null)}
      >
        <div className="image-modal-content">
          <button 
            className="close-button"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedImage(null);
            }}
          >
            ×
          </button>
          <img 
            src={expandedImage} 
            alt="放大预览" 
            className="expanded-image"
          />
        </div>
      </div>
    )}
  );
};

export default TrainingMaterials;