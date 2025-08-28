import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

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

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="home-container">
      {/* 英雄区域 */}
      <section className="hero-section">
        <div className="hero-gradient"></div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content-wrapper">
          <div className="hero-content">
            <div className="hero-tagline">🚀 机器人技术与太空探索</div>
            <h1 className="hero-title">探索未知<br/>成就未来</h1>
            <p className="hero-description">
              加入火星车创新团队，与志同道合的伙伴一起<br/>
              突破技术边界，创造无限可能
            </p>
            <div className="cta-buttons">
              <Link to="/apply" className="btn-primary">立即加入我们</Link>
              <div className="secondary-buttons">
                <Link to="/schedule" className="btn-secondary">培训日程</Link>
                <Link to="/materials" className="btn-secondary">学习资料</Link>
              </div>
            </div>
          </div>
          
          <div className="hero-image-container">
            <div className="hero-illustration">
              <div className="rover-icon">
                <div className="rover-body">
                  <div className="rover-top"></div>
                  <div className="rover-camera"></div>
                  <div className="rover-wheels">
                    <div className="wheel"></div>
                    <div className="wheel"></div>
                    <div className="wheel"></div>
                    <div className="wheel"></div>
                  </div>
                </div>
              </div>
              <div className="hero-decor">
                <div className="decor-circle circle-1"></div>
                <div className="decor-circle circle-2"></div>
                <div className="decor-circle circle-3"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">
              {isVisible ? <AnimatedNumber targetValue="1000+" /> : '0+'}
            </div>
            <div className="stat-label">创新项目</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {isVisible ? <AnimatedNumber targetValue="50+" /> : '0+'}
            </div>
            <div className="stat-label">技术突破</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {isVisible ? <AnimatedNumber targetValue="100+" /> : '0+'}
            </div>
            <div className="stat-label">团队成员</div>
          </div>
        </div>
      </section>

      {/* 组织介绍 */}
      <section className="about-section">
        <h2>关于我们</h2>
        <p>火星车团队汇聚机器人技术与太空探索精英，以技术创新为驱动，培养面向未来的科技人才。</p>
        <div className="features">
          <div className="feature-card">
            <h3>技术创新</h3>
            <p>突破机器人技术边界，引领行业未来发展</p>
          </div>
          <div className="feature-card">
            <h3>团队协作</h3>
            <p>跨学科融合，激发无限创新潜能</p>
          </div>
          <div className="feature-card">
            <h3>实践育人</h3>
            <p>真实项目历练，塑造未来科技领袖</p>
          </div>
          <div className="feature-card">
            <h3>创业孵化</h3>
            <p>技术商业化，成就科技创新梦想</p>
          </div>
        </div>
      </section>

      {/* 项目展示 */}
      <section className="projects-section">
        <h2>核心项目</h2>
        <div className="project-grid">
          <div className="project-card">
            <div className="project-card-content">
              <h3>智能火星探测系统</h3>
              <p>融合AI算法与精密机械，打造适应极端环境的智能探测平台，为未来太空探索奠定技术基础。</p>
            </div>
          </div>
          <div className="project-card">
            <div className="project-card-content">
              <h3>国际机器人竞技</h3>
              <p>在全球顶级赛事中屡创佳绩，展现中国大学生的技术实力与创新精神。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;