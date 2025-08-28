import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MobileHome.css';

const AnimatedNumber = ({ targetValue, duration = 2000 }) => {
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    const targetNum = parseInt(targetValue);
    const increment = targetNum / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        setCurrentValue(targetNum);
        clearInterval(timer);
      } else {
        setCurrentValue(Math.floor(current));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [targetValue, duration]);
  
  return <>{currentValue}{targetValue.includes('+') ? '+' : ''}</>;
};

const MobileHome = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="mobile-home-container">
      {/* 移动端英雄区域 */}
      <section className="mobile-hero-section">
        <div className="mobile-hero-content">
          <div className="mobile-hero-tagline">🚀 机器人技术与太空探索</div>
          <h1 className="mobile-hero-title">
            探索未知
            <br/>
            成就未来
          </h1>
          <p className="mobile-hero-description">
            加入重邮-京东未来智能视觉联合研究实践基地
            <br/>
            与志同道合的伙伴一起
            <br/>
            突破技术边界，创造无限可能
          </p>
          
          <div className="mobile-cta-section">
            <Link to="/apply" className="mobile-btn-primary">
              立即加入我们
            </Link>
            <div className="mobile-btn-group">
              <Link to="/schedule" className="mobile-btn-secondary">
                培训日程
              </Link>
              <Link to="/materials" className="mobile-btn-secondary">
                学习资料
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 移动端统计数据 */}
      <section className="mobile-stats-section">
        <h3 className="mobile-stats-title">团队成就</h3>
        <div className="mobile-stats-grid">
          <div className="mobile-stat-item">
            <div className="mobile-stat-number">
              {isVisible ? <AnimatedNumber targetValue="1000+" /> : '0+'}
            </div>
            <div className="mobile-stat-label">创新项目</div>
          </div>
          <div className="mobile-stat-item">
            <div className="mobile-stat-number">
              {isVisible ? <AnimatedNumber targetValue="50+" /> : '0+'}
            </div>
            <div className="mobile-stat-label">技术突破</div>
          </div>
          <div className="mobile-stat-item">
            <div className="mobile-stat-number">
              {isVisible ? <AnimatedNumber targetValue="100+" /> : '0+'}
            </div>
            <div className="mobile-stat-label">团队成员</div>
          </div>
        </div>
      </section>

      {/* 移动端关于我们 */}
      <section className="mobile-about-section">
        <h3 className="mobile-section-title">关于我们</h3>
        <p className="mobile-about-text">
          重邮-京东未来智能视觉联合研究实践基地汇聚机器人技术与智能视觉精英，
          以技术创新为驱动，培养面向未来的科技人才。
        </p>
        
        <div className="mobile-features">
          <div className="mobile-feature-item">
            <div className="mobile-feature-icon">🚀</div>
            <div className="mobile-feature-text">
              <strong>技术创新</strong>
              <span>突破机器人技术边界</span>
            </div>
          </div>
          <div className="mobile-feature-item">
            <div className="mobile-feature-icon">👥</div>
            <div className="mobile-feature-text">
              <strong>团队协作</strong>
              <span>跨学科融合创新</span>
            </div>
          </div>
          <div className="mobile-feature-item">
            <div className="mobile-feature-icon">🎯</div>
            <div className="mobile-feature-text">
              <strong>实践育人</strong>
              <span>真实项目历练</span>
            </div>
          </div>
          <div className="mobile-feature-item">
            <div className="mobile-feature-icon">💡</div>
            <div className="mobile-feature-text">
              <strong>创业孵化</strong>
              <span>技术商业化</span>
            </div>
          </div>
        </div>
      </section>

      {/* 移动端项目展示 */}
      <section className="mobile-projects-section">
        <h3 className="mobile-section-title">核心项目</h3>
        
        <div className="mobile-project-card">
          <div className="mobile-project-header">
            <div className="mobile-project-icon">🤖</div>
            <h4>智能火星探测系统</h4>
          </div>
          <p className="mobile-project-desc">
            融合AI算法与精密机械，打造适应极端环境的智能探测平台，
            为未来太空探索奠定技术基础。
          </p>
        </div>

        <div className="mobile-project-card">
          <div className="mobile-project-header">
            <div className="mobile-project-icon">🏆</div>
            <h4>国际机器人竞技</h4>
          </div>
          <p className="mobile-project-desc">
            在全球顶级赛事中屡创佳绩，展现中国大学生的技术实力与创新精神。
          </p>
        </div>
      </section>


    </div>
  );
};

export default MobileHome;